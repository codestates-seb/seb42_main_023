package com.teamdragon.dragonmoney.app.global.auth.controller;

import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.auth.dto.TempAccessTokenDto;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2Service;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
public class OAuth2Controller {
    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;
    private final OAuth2Service oAuth2Service;

    //정식 토큰 발급
    @PostMapping("/auth/callback/google")
    public ResponseEntity getToken(@Valid @RequestBody TempAccessTokenDto tempAccessTokenDto,
                                   HttpServletResponse servletResponse) {
        String accessToken = "Bearer " + oAuth2Service.delegateAccessToken(tempAccessTokenDto.getTempAccessToken());
        String refreshToken = oAuth2Service.delegateRefreshToken(tempAccessTokenDto.getTempAccessToken());

        LoginResponseDto response = oAuth2Service.findLoginMember(tempAccessTokenDto.getTempAccessToken());

        return ResponseEntity.status(HttpStatus.OK)
                .header("Authorization", accessToken)
                .header("Refresh", refreshToken)
                .body(response);
    }

    //Refresh Token으로 Access Token 재발급
    @PostMapping("/auth/refresh/{member-name}")
    public ResponseEntity issuedRefreshToken(@PathVariable("member-name") String name,
                                             HttpServletRequest request, HttpServletResponse response) {
        String refreshTokenGetName = oAuth2Service.refreshTokenGetMemberName(request);

        if(refreshTokenGetName.equals(name)) {
            String accessToken = oAuth2Service.delegateTempAccessToken(name);

            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + accessToken)
                    .build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
