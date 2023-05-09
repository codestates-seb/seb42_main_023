package com.teamdragon.dragonmoney.app.global.auth.controller;

import com.teamdragon.dragonmoney.app.domain.member.service.MemberHandleService;
import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.auth.dto.TempAccessTokenDto;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2FindService;
import com.teamdragon.dragonmoney.app.global.auth.service.TokenHandleService;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class TokenController {
    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;
    private final TokenHandleService tokenHandleService;
    private final OAuth2FindService oAuth2FindService;
    private final MemberHandleService memberHandleService;

    // 탈퇴한 회원 재가입
    @PatchMapping("/account-recovery")
    public ResponseEntity<LoginResponseDto> modifyMemberToActive(@Valid @RequestBody TempAccessTokenDto tempAccessTokenDto) {
        Map<String, Object> claims = tokenHandleService.getNameAneRoles(tempAccessTokenDto.getTempAccessToken());
        String memberName = (String) claims.get("name");
        memberHandleService.changeMemberStateToActive(claims);

        String accessToken = "Bearer " + tokenHandleService.delegateAccessToken(memberName);
        String refreshToken = tokenHandleService.saveRefresh(memberName);

        LoginResponseDto response = oAuth2FindService.findLoginMember(memberName);

        return ResponseEntity.status(HttpStatus.OK)
                .header("Authorization", accessToken)
                .header("Refresh", refreshToken)
                .body(response);
    }

    // 정식 토큰 발급
    @PostMapping("/auth/callback/google")
    public ResponseEntity<LoginResponseDto> createAllToken(@Valid @RequestBody TempAccessTokenDto tempAccessTokenDto) {
        Map<String, Object> claims = tokenHandleService.getNameAneRoles(tempAccessTokenDto.getTempAccessToken());
        String memberName = (String) claims.get("name");

        String accessToken = "Bearer " + tokenHandleService.delegateAccessToken(memberName);
        String refreshToken = tokenHandleService.saveRefresh(memberName);

        LoginResponseDto response = oAuth2FindService.findLoginMember(memberName);

        return ResponseEntity.status(HttpStatus.OK)
                .header("Authorization", accessToken)
                .header("Refresh", refreshToken)
                .body(response);
    }

    // Refresh Token 으로 Access Token 재발급
    @PostMapping("/auth/refresh/{member-name}")
    public ResponseEntity<Void> createAccessToken(@PathVariable("member-name") String name,
                                                  HttpServletRequest request) {
        tokenHandleService.verifyJws(request);
        String memberNameGetRefreshToken = oAuth2FindService.findRefreshTokenByMemberName(name).getRefreshTokenValue();

        if(!request.getHeader("Refresh").equals(memberNameGetRefreshToken)) {
            throw new AuthLogicException(AuthExceptionCode.REFRESH_TOKEN_INVALID);
        }
        String accessToken = tokenHandleService.delegateAccessToken(name);

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + accessToken)
                .build();
    }
}
