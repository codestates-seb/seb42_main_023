package com.teamdragon.dragonmoney.app.global.auth.service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface TokenHandleService {

    // Temp Access Token 파싱
    Map<String, Object> getNameAneRoles(String tempAccessToken);

    // Access Token 발급
    String delegateAccessToken(String name);

    // RefreshToken 발급
    String saveRefresh(String name);

    // Refresh Token 검증
    void verifyJws(HttpServletRequest request);

    // Refresh Token 파싱
    Map<String, Object> getMemberNameFromRefreshToken(HttpServletRequest request);
}
