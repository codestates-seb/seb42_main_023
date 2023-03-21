package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public enum ValidFailExceptionCode {

    ORDER_BY_NOT_VALID(400, null, "Not valid orderby value");

    private final int status;
    private final Integer detailedCode;
    private final String message;

    ValidFailExceptionCode(int statusCode, Integer detailedCode, String message) {
        this.status = statusCode;
        this.detailedCode = detailedCode;
        this.message = message;
    }
}
