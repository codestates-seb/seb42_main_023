package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public class AuthLogicException extends RuntimeException{

    private final AuthExceptionCode exceptionCode;

    public AuthLogicException(AuthExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
