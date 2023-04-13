package com.teamdragon.dragonmoney.app.global.auth.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface OAuth2HandleService {

    // Temp Access Token 발급
    String delegateTempAccessToken(String name);

    // Access Token 발급
    String delegateAccessToken(String tempAccessToken);

    // AccessToken 재발급
    String delegateAccessTokenAgain(String memberName);

    // RefreshToken 발급
    String delegateRefreshToken(String tempAccessToken);

    //tempAccessToken 저장
    Member updateTempAccessToken(String name, String tempAccessToken);

    // Refresh Token 검증
    void verifyJws(HttpServletRequest request);

    // Refresh Token 파싱
    Map<String, Object> getMemberNameFromRefreshToken(HttpServletRequest request);

    // 탈퇴된 회원 복구
    Member changeMemberStateToActive(String tempAccessToken);
}
