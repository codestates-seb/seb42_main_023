package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {
    private final BusinessExceptionCode exceptionCode;

    public BusinessLogicException(BusinessExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}