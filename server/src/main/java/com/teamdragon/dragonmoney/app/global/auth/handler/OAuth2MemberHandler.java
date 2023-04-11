package com.teamdragon.dragonmoney.app.global.auth.handler;

import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2Service;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
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

        // 탈퇴 후 복구할 회원
        if(memberService.isDeletedMemberByEmail(email)) {
            String name = memberService.findMemberNameByEmail(email);
            String tempAccessToken = oAuth2Service.delegateTempAccessToken(name);

            oAuth2Service.updateTempAccessToken(name, tempAccessToken);

            redirectForComeBackMember(request, response, tempAccessToken, authorities);
        }
        // 이미 있는 회원
        else if(memberService.checkOAuthMemberByEmail(email)) {
            String name = memberService.findMemberNameByEmail(email);
            String tempAccessToken = oAuth2Service.delegateTempAccessToken(name);

            oAuth2Service.updateTempAccessToken(name, tempAccessToken);

            redirectForTempAccessToken(request, response, tempAccessToken, authorities);
        }
        // 신규 회원
       else {
            String tempName = UUID.randomUUID().toString();
            memberService.createMember("google", picture, tempName, email, authorities);

            redirectNameCheckPage(request, response, tempName);
        }
    }

    // 닉네임 중복 검사 페이지로 리다이렉트
    private void redirectNameCheckPage(HttpServletRequest request, HttpServletResponse response, String tempName) throws IOException {
        String uri = createCheckNameURI(tempName).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    // 임시 토큰을 줄 페이지로 리다이렉트
    private void redirectForTempAccessToken(HttpServletRequest request, HttpServletResponse response, String tempAccessToken, List<String> authorities) throws IOException {
        String uri = createTempAccessTokenURI(tempAccessToken).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    // 임시 토큰을 줄 페이지로 리다이렉트
    private void redirectForComeBackMember(HttpServletRequest request, HttpServletResponse response, String tempAccessToken, List<String> authorities) throws IOException {
        String uri = deletedMemberComebackURI(tempAccessToken).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createCheckNameURI(String tempName) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("TempName", tempName);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com")
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
                .host("hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com")
                .path("/temptoken")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    private URI deletedMemberComebackURI(String tempAccessToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("tempAccessToken", tempAccessToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com")
                .path("/recovery")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}