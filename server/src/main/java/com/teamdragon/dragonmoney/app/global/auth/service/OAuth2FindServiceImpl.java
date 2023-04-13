package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class OAuth2FindServiceImpl implements OAuth2FindService{

    private final MemberFindService memberFindService;
    private final MemberRepository memberRepository;

    // 로그인 정보 찾기
    @Override
    public LoginResponseDto findLoginMember(String tempAccessToken) {
        Member member = findMemberByTempAccessToken(tempAccessToken);
        String name = member.getName();
        String picture = member.getProfileImage();
        List<String> roles = member.getRoles();
        String role = roles.get(0);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setName(name);
        loginResponseDto.setPicture(picture);
        loginResponseDto.setRole(role);
        return loginResponseDto;
    }

    // 해당 임시 토큰을 가진 회원이 있는지 조회
    @Override
    public Member findMemberByTempAccessToken(String tempAccessToken) {
        Optional<Member> optionalMember = memberRepository.findByTempAccessToken(tempAccessToken);

        return optionalMember
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 회원 이름으로 refreshToken 조회
    @Override
    public String findRefreshTokenByMemberName(String memberName) {
        Member member = memberFindService.findVerifiedMemberName(memberName);
        String refreshToken = member.getRefreshToken().getRefreshTokenValue();

        return refreshToken;
    }
}
