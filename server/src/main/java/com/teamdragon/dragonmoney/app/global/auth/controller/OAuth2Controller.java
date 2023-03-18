package com.teamdragon.dragonmoney.app.global.auth.controller;

import com.teamdragon.dragonmoney.app.global.auth.dto.TempAccessTokenDto;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2Service;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;

//정식 Access Token Refresh Token 발급
@CrossOrigin
@Slf4j
@RequiredArgsConstructor
@RestController
public class OAuth2Controller {
    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;
    private final OAuth2Service oAuth2Service;

    @PostMapping("/auth/callback/google")
    public ResponseEntity getAccess(@RequestBody TempAccessTokenDto tempAccessTokenDto) {
        String accessToken = oAuth2Service.delegateAccessToken(tempAccessTokenDto.getTempAccessToken());
        String refreshToken = oAuth2Service.delegateRefreshToken(tempAccessTokenDto.getTempAccessToken());

        Cookie cookie = new Cookie("Refresh", refreshToken);
        cookie.setMaxAge(refreshTokenExpirationMinutes);
        cookie.isHttpOnly();

        return ResponseEntity.status(HttpStatus.OK)
                .header("Authorization", accessToken)
                .header("Set-Cookie", "Refresh="+cookie)
                .build();
    }
}
