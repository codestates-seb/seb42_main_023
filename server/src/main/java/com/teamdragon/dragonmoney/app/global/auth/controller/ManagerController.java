package com.teamdragon.dragonmoney.app.global.auth.controller;

import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2FindService;
import com.teamdragon.dragonmoney.app.global.auth.service.TokenHandleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ManagerController {
    private final TokenHandleService tokenHandleService;
    private final OAuth2FindService oAuth2FindService;
    private static final String ADMIN = "ADMIN";

    @GetMapping("/manager")
    public ResponseEntity<LoginResponseDto> getManagerAuthority() {
        ResponseCookie accessToken = tokenHandleService.putAccessTokenInCookie(ADMIN);
        ResponseCookie refreshToken = tokenHandleService.saveRefresh(ADMIN);

        LoginResponseDto response = oAuth2FindService.findLoginMember(ADMIN);

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, accessToken.toString(), refreshToken.toString())
                .body(response);
    }
}
