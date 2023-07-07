package com.teamdragon.dragonmoney.app.global.auth.handler;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberHandleService;
import com.teamdragon.dragonmoney.app.global.auth.service.TokenHandleService;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.net.URI;
import java.util.*;

@RequiredArgsConstructor
@Component
public class OAuth2MemberHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${login.redirect.uri-host}")
    private String redirectUriHost;

    private final CustomAuthorityUtils authorityUtils;
    private final MemberHandleService memberHandleService;
    private final MemberFindService memberFindService;
    private final TokenHandleService tokenHandleService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String picture = String.valueOf(oAuth2User.getAttributes().get("picture"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> authorities = authorityUtils.createRoles(email);

        // 신규 회원
        if(!memberHandleService.isNewMember(email)) {
            String tempName = UUID.randomUUID().toString();
            memberHandleService.createMember("google", picture, tempName, email, authorities);

            redirectNameCheckPage(request, response, tempName);
        }
        // 존재하는 회원
        else {
            Member member = memberFindService.findVerifyMemberByEmailAndOAuthKind(email, "google");
            String name = member.getName();
            String tempAccessToken = tokenHandleService.delegateAccessToken(name);

            switch (member.getState()) {
                case ACTIVE:
                    redirectForTempAccessToken(request, response, tempAccessToken);
                    break;
                case TEMP:
                    redirectNameCheckPage(request, response, name);
                    break;
                case DELETED:
                    redirectForComeBackMember(request, response, tempAccessToken);
                    break;
            }
        }
    }

    // 닉네임 중복 검사 페이지로 리다이렉트
    private void redirectNameCheckPage(HttpServletRequest request, HttpServletResponse response, String tempName) throws IOException {
        String uri = createCheckNameURI(tempName).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    // 임시 토큰을 줄 페이지로 리다이렉트
    private void redirectForTempAccessToken(HttpServletRequest request, HttpServletResponse response, String tempAccessToken) throws IOException {
        String uri = createTempAccessTokenURI(tempAccessToken).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    // 임시 토큰을 줄 페이지로 리다이렉트
    private void redirectForComeBackMember(HttpServletRequest request, HttpServletResponse response, String tempAccessToken) throws IOException {
        String uri = deletedMemberComebackURI(tempAccessToken).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createCheckNameURI(String tempName) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("TempName", tempName);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(redirectUriHost)
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
                .host(redirectUriHost)
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
                .host(redirectUriHost)
                .path("/recovery")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}