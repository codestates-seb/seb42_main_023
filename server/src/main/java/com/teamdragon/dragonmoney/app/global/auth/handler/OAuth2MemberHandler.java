package com.teamdragon.dragonmoney.app.global.auth.handler;

import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2Service;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.net.URI;
import java.util.*;

@Slf4j
@Component
public class OAuth2MemberHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final OAuth2Service oAuth2Service;

    public OAuth2MemberHandler(JwtTokenizer jwtTokenizer,
                               CustomAuthorityUtils authorityUtils,
                               MemberService memberService,
                               OAuth2Service oAuth2Service) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
        this.oAuth2Service = oAuth2Service;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String picture = String.valueOf(oAuth2User.getAttributes().get("picture"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> authorities = authorityUtils.createRoles(email);

        //이미 가입한 회원일 때(이미 크리덴셜에 정보가 있으므로 따로 정보를 가져올 필요가 없다)
        if(memberService.checkOAuthMemberName(email)) {
            //해당 email에 맞는 name을 가져온다.
            String name = memberService.getNameBySearchEmail(email);
            //임시 토큰 발급
            String tempAccessToken = oAuth2Service.delegateTempAccessToken(name);
            //tempAccessToken을 db에 저장
            oAuth2Service.updatedTempAccessToken(name, tempAccessToken);
            redirectForTempAccessToken(request, response, tempAccessToken, authorities);
        } else {                        //신규 회원일 때 (정보를 저장)
            //UUID 생성
            String tempName = UUID.randomUUID().toString();
            //DB에 정보 저장
            memberService.saveMember("google", picture, tempName, email, authorities);
            //중복 검사 페이지로 리다이렉트
            redirectNameCheckPage(request, response, tempName);
        }
    }

    //닉네임 중복 검사 페이지로 리다이렉트(uri에 uuid를 담아서 보낸다.)
    private void redirectNameCheckPage(HttpServletRequest request, HttpServletResponse response, String tempName) throws IOException {
        String uri = createCheckNameURI(tempName).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    //임시 토큰을 줄 페이지로 리다이렉트
    private void redirectForTempAccessToken(HttpServletRequest request, HttpServletResponse response, String tempAccessToken, List<String> authorities) throws IOException {
        String uri = createTempAccessTokenURI(tempAccessToken).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createCheckNameURI(String tempName) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("TempName", tempName);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
//                .host("hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com")
                .host("localhost")
                .port(3000)
                .path("/setnickname")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    private URI createTempAccessTokenURI(String tempAccessToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("tempAccessToken", tempAccessToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
//                .host("hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com")
                .host("localhost")
                .port(3000)
                .path("/temptoken")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}