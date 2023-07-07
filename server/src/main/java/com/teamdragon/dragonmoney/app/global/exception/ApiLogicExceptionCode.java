package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public enum ApiLogicExceptionCode {
    HOUSE_PRICE_API_GET_FAIL(400, null, "정상응답을 받아오는데 실패하였습니다.");

    private final int status;
    private final Integer detailedCode;
    private final String message;

    ApiLogicExceptionCode(int statusCode, Integer detailedCode, String message) {
        this.status = statusCode;
        this.detailedCode = detailedCode;
        this.message = message;
    }
}
