package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuth2Service {
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    //Access Token 발급
    public String delegateAccessToken(String tempAccessToken) {
        Member member = findMemberByTempAccessToken(tempAccessToken);
        String name = member.getName();

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", name);
//        claims.put("roles", authorities);

        String subject = name;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    //RefreshToken 발급
    public String delegateRefreshToken(String tempAccessToken) {
        Member member = findMemberByTempAccessToken(tempAccessToken);
        String name = member.getName();

        String subject = name;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    //tempAccessToken 저장
    public Member updatedTempAccessToken(String name, String tempAccessToken) {
        Member member = memberRepository.findByTempName(name);
        member.setTempAccessToken(tempAccessToken);

        return memberRepository.save(member);
    }

    //해당 임시 토큰을 가진 회원이 있는지 조회
    public Member findMemberByTempAccessToken(String tempAccessToken) {

        return memberRepository.findByTempAccessToken(tempAccessToken);
    }
}