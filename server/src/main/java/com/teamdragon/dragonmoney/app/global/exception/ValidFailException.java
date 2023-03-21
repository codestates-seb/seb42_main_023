package com.teamdragon.dragonmoney.app.global.exception;

public class ValidFailException extends RuntimeException {
    private final ValidFailExceptionCode exceptionCode;

    public ValidFailException(ValidFailExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
