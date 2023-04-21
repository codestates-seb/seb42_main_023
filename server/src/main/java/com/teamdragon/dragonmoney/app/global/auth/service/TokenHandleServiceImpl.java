package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.refresh.entity.RefreshToken;
import com.teamdragon.dragonmoney.app.global.auth.refresh.repository.RefreshTokenRepository;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RequiredArgsConstructor
@Transactional
@Service
public class TokenHandleServiceImpl implements OAuth2HandleService {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberFindService memberFindService;

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

    // RefreshToken 발급
    @Override
    public String delegateRefreshToken(Map<String, Object> claims) {
        Member member = memberFindService.findVerifyMemberByName((String) claims.get("name"));

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(member.getName(), expiration, base64EncodedSecretKey);

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .member(member)
                .refreshTokenValue(refreshToken)
                .build();

        refreshTokenRepository.save(refreshTokenEntity);

        member.saveRefreshToken(refreshTokenEntity);

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
        String jws = request.getHeader("Refresh");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }
}