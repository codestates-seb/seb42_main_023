package com.teamdragon.dragonmoney.app.global.auth.controller;

import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.auth.dto.TempAccessTokenDto;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2FindService;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2HandleService;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
public class OAuth2Controller {
    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;
    private final OAuth2HandleService oAuth2HandleService;
    private final OAuth2FindService oAuth2FindService;

    // 탈퇴한 회원 재가입
    @PostMapping("/comeback")
    public ResponseEntity<LoginResponseDto> modifyMemberToActive(@Valid @RequestBody TempAccessTokenDto tempAccessTokenDto) {
        oAuth2HandleService.changeMemberStateToActive(tempAccessTokenDto.getTempAccessToken());

        String accessToken = "Bearer " + oAuth2HandleService.delegateAccessToken(tempAccessTokenDto.getTempAccessToken());
        String refreshToken = oAuth2HandleService.delegateRefreshToken(tempAccessTokenDto.getTempAccessToken());

        LoginResponseDto response = oAuth2FindService.findLoginMember(tempAccessTokenDto.getTempAccessToken());

        return ResponseEntity.status(HttpStatus.OK)
                .header("Authorization", accessToken)
                .header("Refresh", refreshToken)
                .body(response);
    }

    // 정식 토큰 발급
    @PostMapping("/auth/callback/google")
    public ResponseEntity<LoginResponseDto> createAllToken(@Valid @RequestBody TempAccessTokenDto tempAccessTokenDto) {
        String accessToken = "Bearer " + oAuth2HandleService.delegateAccessToken(tempAccessTokenDto.getTempAccessToken());
        String refreshToken = oAuth2HandleService.delegateRefreshToken(tempAccessTokenDto.getTempAccessToken());

        LoginResponseDto response = oAuth2FindService.findLoginMember(tempAccessTokenDto.getTempAccessToken());

        return ResponseEntity.status(HttpStatus.OK)
                .header("Authorization", accessToken)
                .header("Refresh", refreshToken)
                .body(response);
    }

    // Refresh Token 으로 Access Token 재발급
    @PostMapping("/auth/refresh/{member-name}")
    public ResponseEntity<Void> createAccessToken(@PathVariable("member-name") String name,
                                                  HttpServletRequest request) {
        oAuth2HandleService.verifyJws(request);
        String memberNameGetRefreshToken = oAuth2FindService.findRefreshTokenByMemberName(name);

        if(!request.getHeader("Refresh").equals(memberNameGetRefreshToken)) {
            throw new AuthLogicException(AuthExceptionCode.REFRESH_TOKEN_INVALID);
        }
        String accessToken = oAuth2HandleService.delegateAccessTokenAgain(name);

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + accessToken)
                .build();
    }
}
