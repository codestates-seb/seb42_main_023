package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public enum AuthExceptionCode {
    BAD_REQUEST(400, null, "Bad Request"),
    TOKEN_NOT_FOUND(400, null, "Refresh token not found"),
    ACCESS_TOKEN_INVALID_01(401, 1, "Invalid Access token"),
    REFRESH_TOKEN_INVALID(401, null, "Invalid Refresh token"),
    ACCESS_TOKEN_EXPIRED(401, null, "Access token expired"),
    REFRESH_TOKEN_EXPIRED(401, null, "Refresh token expired"),
    AUTHORIZED_FAIL(403, null, "Authorized Fail"),
    USER_UNAUTHORIZED(403, null, "User unauthorized");

    private final int status;
    private final Integer detailedCode;
    private final String message;

    AuthExceptionCode(int statusCode, Integer detailedCode, String message) {
        this.status = statusCode;
        this.detailedCode = detailedCode;
        this.message = message;
    }
}