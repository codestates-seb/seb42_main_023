package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.global.auth.dto.LoginResponseDto;
import com.teamdragon.dragonmoney.app.global.auth.refresh.entity.RefreshToken;

public interface OAuth2FindService {

    // 로그인한 회원 정보 찾기
    LoginResponseDto findLoginMember(String tempAccessToken);

    // 회원 이름으로 refreshToken 조회
    RefreshToken findRefreshTokenByMemberName(String memberName);
}
