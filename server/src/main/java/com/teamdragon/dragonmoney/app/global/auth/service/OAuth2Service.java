package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class OAuth2Service {
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    //Temp Access Token 발급
    public String delegateTempAccessToken(String name) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", name);

        String subject = name;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getTempAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

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

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(name, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    //tempAccessToken 저장
    public Member updatedTempAccessToken(String name, String tempAccessToken) {
//        Optional<Member> member = memberRepository.findByName(name);
        Member member = memberService.findVerifiedMemberName(name);
        member.setTempAccessToken(tempAccessToken);

        return memberRepository.save(member);
    }

    //로그인 정보 찾기
    public LoginResponseDto findLoginMember(String tempAccessToken) {
        Member member = findMemberByTempAccessToken(tempAccessToken);
        String name = member.getName();
        String picture = member.getProfileImage();

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setName(name);
        loginResponseDto.setPicture(picture);
        return loginResponseDto;
    }

    //해당 임시 토큰을 가진 회원이 있는지 조회
    public Member findMemberByTempAccessToken(String tempAccessToken) {
        Optional<Member> optionalMember = memberRepository.findByTempAccessToken(tempAccessToken);

        return optionalMember
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }
}