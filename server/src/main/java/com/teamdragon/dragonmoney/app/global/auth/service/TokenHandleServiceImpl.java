package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.refresh.entity.RefreshToken;
import com.teamdragon.dragonmoney.app.global.auth.refresh.repository.RefreshTokenRepository;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RequiredArgsConstructor
@Transactional
@Service
public class TokenHandleServiceImpl implements TokenHandleService {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberFindService memberFindService;
    private final OAuth2FindService oAuth2FindService;

    private static final String SERVER_DOMAIN = "thedragonmoney.com";
    private static final String COOKIE_PATH = "/";
    private static final String ACCESS_TOKEN = "AUTHENTICATION";
    private static final String REFRESH_TOKEN = "REFRESH";

    // Temp Access Token 파싱
    @Override
    public Map<String, Object> getNameAneRoles(String tempAccessToken) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(tempAccessToken, base64EncodedSecretKey).getBody();

        return claims;
    }

    // Access Token 발급
    @Override
    public String delegateAccessToken(String memberName) {
        Member member = memberFindService.findVerifyMemberByName(memberName);
        List<String> roles = member.getRoles();

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", memberName);
        claims.put("roles", roles);

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getTempAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, memberName, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // Access Token 쿠키 발급
    public ResponseCookie putAccessTokenInCookie(String memberName) {
        String accessToken = "Bearer" + delegateAccessToken(memberName);

        return ResponseCookie.from(ACCESS_TOKEN, accessToken)
                .domain(SERVER_DOMAIN)
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .path(COOKIE_PATH)
                .maxAge(3 * 60 * 60)
                .build();
    }

    // RefreshToken 저장
    public ResponseCookie saveRefresh(String name) {
        Member member = memberFindService.findVerifyMemberByName(name);
        String refreshToken = delegateRefreshToken(member);

        if(member.getRefreshToken() == null) {
            RefreshToken refreshTokenEntity = RefreshToken.builder()
                    .member(member)
                    .refreshTokenValue(refreshToken)
                    .build();

            refreshTokenRepository.save(refreshTokenEntity);
            member.saveRefreshToken(refreshTokenEntity);
        }
        else {
            RefreshToken refreshTokenEntity = oAuth2FindService.findRefreshTokenByMemberName(name);
            refreshTokenEntity.updateRefreshToken(refreshToken);
        }

        return ResponseCookie.from(REFRESH_TOKEN, refreshToken)
                .domain(SERVER_DOMAIN)
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .path(COOKIE_PATH)
                .maxAge(3 * 60 * 60)
                .build();
    }

    // RefreshToke 발급
    private String delegateRefreshToken(Member member) {
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(member.getName(), expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    // Refresh Token 검증
    @Override
    public void verifyJws(HttpServletRequest request) {
        try {
            Map<String, Object> claims = getMemberNameFromRefreshToken(request);
        } catch (SignatureException se) {
            throw new AuthLogicException(AuthExceptionCode.REFRESH_TOKEN_INVALID);
        } catch (ExpiredJwtException ee) {
            throw new AuthLogicException(AuthExceptionCode.REFRESH_TOKEN_EXPIRED);
        } catch (Exception e) {
            throw new AuthLogicException(AuthExceptionCode.USER_UNAUTHORIZED);
        }
    }

    // Resresh Token 파싱
    @Override
    public Map<String, Object> getMemberNameFromRefreshToken(HttpServletRequest request) {
        String jws = request.getHeader(REFRESH_TOKEN);
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }
}