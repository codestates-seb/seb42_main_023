package com.teamdragon.dragonmoney.app.global.auth.controller;

import com.teamdragon.dragonmoney.app.global.auth.dto.TempAccessTokenDto;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.Cookie;

//정식 Access Token Refresh Token 발급
@Slf4j
@Controller
@RequiredArgsConstructor
public class OAuth2Controller {
    private OAuth2Service oAuth2Service;

    @PostMapping("/auth/callback/google")
    public ResponseEntity getAccess(@RequestBody TempAccessTokenDto tempAccessTokenDto) {
        String accessToken = oAuth2Service.delegateAccessToken(tempAccessTokenDto.getTempAccessToken());
        String refreshToken = oAuth2Service.delegateRefreshToken(tempAccessTokenDto.getTempAccessToken());

        Cookie cookie = new Cookie("refresh", refreshToken);

        return ResponseEntity.status(HttpStatus.OK)
                .header("Access Token", accessToken)
                .header("Set-Cookie", "refresh="+cookie)
                .build();
    }
}