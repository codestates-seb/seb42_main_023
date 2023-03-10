package com.teamdragon.dragonmoney.app.global.response;

import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

// 에러 응답 객체
@Getter
public class ErrorResponse {
    private int status;
    private Integer detailedCode;
    private String message;
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;

    private ErrorResponse(int status, Integer detailedCode ,String message) {
        this.status = status;
        this.detailedCode = detailedCode;
        this.message = message;
    }

    private ErrorResponse(final List<FieldError> fieldErrors,
                          final List<ConstraintViolationError> violationErrors) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldError.of(bindingResult), null);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }

    // 비즈니스 로직 예외
    public static ErrorResponse of(BusinessExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getDetailedCode(), exceptionCode.getMessage());
    }

    // 인증관련 예외
    public static ErrorResponse of(AuthExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getDetailedCode(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), null, httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), null, message);
    }

    @Getter
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

        private FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors =
                                                        bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ?
                                            "" : error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError(String propertyPath, Object rejectedValue,
                                   String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(
                Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }
}