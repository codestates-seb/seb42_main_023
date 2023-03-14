package com.teamdragon.dragonmoney.app.global.auth.handler;

import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.*;

//OAuth 2 인증 후, Frontend 쪽으로 JWT 를 전송!
public class OAuth2MemberHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    public OAuth2MemberHandler(JwtTokenizer jwtTokenizer,
                               CustomAuthorityUtils authorityUtils,
                               MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("# Redirect to Frontend");
        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String name = String.valueOf(oAuth2User.getAttributes().get("name"));
        String picture = String.valueOf(oAuth2User.getAttributes().get("picture"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> authorities = authorityUtils.createRoles(name);

        //이미 가입한 회원일 때(이미 크리덴셜에 정보가 있으므로 따로 정보를 가져올 필요가 없다)
        if(memberService.checkOAuthMemberName("google", email)) {
            //해당 email에 맞는 name을 가져온다.
            String nickname = memberService.getNameBySearchEmail(email);
            loginResponse(response, nickname, authorities,true);
        } else {                        //신규 회원일 때 (정보를 저장)
            //UUID 생성
            String uuid = UUID.randomUUID().toString();
            //DB에 정보 저장
            memberService.saveMember("google", picture, uuid, email);
            loginFailResponse(response, uuid,false);
        }

    }

    //로그인 성공 시 클라이언트에 보낼 response 데이터
    private void loginResponse(HttpServletResponse response, String name, List<String> authorities, Boolean checkName) throws IOException {
        String accessToken = delegateAccessToken(name, authorities);
        String refreshToken = delegateRefreshToken(name);
        response.setHeader("Access Token", accessToken);
        response.setHeader("Refresh Token", refreshToken);
        response.setHeader("nameDuplicateCheck", String.valueOf(checkName));
    }

    //신규 회원 가입 시 클라이언트에 보낼 response 데이터
    private void loginFailResponse(HttpServletResponse response, String uuid, Boolean checkName) throws IOException {
        response.setHeader("uuid", uuid);
        response.setHeader("nameDuplicateCheck", String.valueOf(checkName));
    }

    private String delegateAccessToken(String name, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", name);
        claims.put("roles", authorities);

        String subject = name;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String name) {
        String subject = name;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

}
