package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.refresh.entity.RefreshToken;
import com.teamdragon.dragonmoney.app.global.auth.refresh.repository.RefreshTokenRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RequiredArgsConstructor
@Transactional
@Service
public class OAuth2Service {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
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
        List<String> roles = member.getMemberRoles();

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", name);
        claims.put("roles", roles);

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

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .member(member)
                .refreshTokenValue(refreshToken)
                .build();

        refreshTokenRepository.save(refreshTokenEntity);

        member.saveRefreshToken(refreshTokenEntity);

        return refreshToken;
    }

    //tempAccessToken 저장
    public Member updatedTempAccessToken(String name, String tempAccessToken) {
        Member member = memberService.findVerifiedMemberName(name);
        member.setTempAccessToken(tempAccessToken);

        return memberRepository.save(member);
    }

    //Resresh Token 파싱
    public String refreshTokenGetMemberName(HttpServletRequest request) {
        String jws = request.getHeader("Refresh");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        String name = String.valueOf(claims.get("sub"));

        return name;
    }

    //로그인 정보 찾기
    public LoginResponseDto findLoginMember(String tempAccessToken) {
        Member member = findMemberByTempAccessToken(tempAccessToken);
        String name = member.getName();
        String picture = member.getProfileImage();
        List<String> roles = member.getMemberRoles();
        String role = roles.get(0);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setName(name);
        loginResponseDto.setPicture(picture);
        loginResponseDto.setRole(role);
        return loginResponseDto;
    }

    // 해당 임시 토큰을 가진 회원이 있는지 조회
    public Member findMemberByTempAccessToken(String tempAccessToken) {
        Optional<Member> optionalMember = memberRepository.findByTempAccessToken(tempAccessToken);

        return optionalMember
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 회원 이름으로 refreshToken 조회
    public String findRefreshTokenByMemberName(String memberName) {
        Member member = memberService.findMember(memberName);
        String refreshToken = member.getRefreshToken().getRefreshTokenValue();

        return refreshToken;
    }
}