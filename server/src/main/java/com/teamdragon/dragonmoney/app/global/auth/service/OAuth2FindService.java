package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;

public interface OAuth2FindService {

    // 로그인 정보 찾기
    LoginResponseDto findLoginMember(String tempAccessToken);

    // 해당 임시 토큰을 가진 회원이 있는지 조회
    Member findMemberByTempAccessToken(String tempAccessToken);

    // 회원 이름으로 refreshToken 조회
    String findRefreshTokenByMemberName(String memberName);
}
