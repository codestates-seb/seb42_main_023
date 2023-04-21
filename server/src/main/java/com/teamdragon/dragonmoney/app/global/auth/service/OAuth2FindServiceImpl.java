package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class OAuth2FindServiceImpl implements OAuth2FindService{

    private final MemberFindService memberFindService;

    // 로그인한 회원 정보 찾기
    @Override
    public LoginResponseDto findLoginMember(String name) {
        Member member = memberFindService.findVerifyMemberByName(name);
        String picture = member.getProfileImage();
        List<String> roles = member.getRoles();
        String role = roles.get(0);

        return LoginResponseDto.builder()
                .name(name)
                .picture(picture)
                .role(role)
                .build();
    }

    // 회원 이름으로 refreshToken 조회
    @Override
    public String findRefreshTokenByMemberName(String memberName) {
        Member member = memberFindService.findVerifyMemberByName(memberName);
        String refreshToken = member.getRefreshToken().getRefreshTokenValue();

        return refreshToken;
    }
}
