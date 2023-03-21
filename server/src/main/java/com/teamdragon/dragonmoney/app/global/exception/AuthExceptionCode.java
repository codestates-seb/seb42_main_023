package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public enum AuthExceptionCode {
    BAD_REQUEST(400, null, "Bad Request"),
    TOKEN_NOT_FOUND(400, null, "Access token not found"),
    ACCESS_TOKEN_INVALID_01(401, 1, "Invalid Access token"),
    ACCESS_TOKEN_INVALID_02(401, 2, "Invalid Access token"),
    REFRESH_TOKEN_INVALID(401, null, "Invalid Refresh token"),

    // 주의 : 내부적으로만 사용하는 예외
    ACCESS_TOKEN_EXPIRED(401, null, "Access token expired"),

    AUTHORIZED_FAIL(403, null, "Authorized Fail"),
    //권한이 없을 때
    USER_UNAUTHORIZED(403, null, "User unauthorized");

    private final int status;
    private final Integer detailedCode; // detaildCode : 01-유효하지 않은 토큰, 02-토큰만료
    private final String message;

    AuthExceptionCode(int statusCode, Integer detailedCode, String message) {
        this.status = statusCode;
        this.detailedCode = detailedCode;
        this.message = message;
    }
}