package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public class ApiLogicException extends RuntimeException{

    private final ApiLogicExceptionCode exceptionCode;

    public ApiLogicException(ApiLogicExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
