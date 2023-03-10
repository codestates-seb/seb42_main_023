package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public enum BusinessExceptionCode {
    BAD_REQUEST(400, null, "Bad Request"),
    USER_EXISTS(409, null, "User already exists"),
    USER_NOT_FOUND(404, null, "User not found"),
    CATEGORY_NOT_FOUND(404, null, "Category not found"),
    POST_NOT_FOUND(404, null, "Post not found"),
    COMMENT_NOT_FOUND(404, null, "Comment not found"),
    REPLY_NOT_FOUND(404, null, "Reply not found"),
    THUMBUP_NOT_FOUND(404, null, "Thumbup not found"),
    THUMBDOWN_NOT_FOUND(404, null, "Thumbdown not found");

    private final int status;
    private final Integer detailedCode;
    private final String message;

    BusinessExceptionCode(int statusCode, Integer detailedCode, String message) {
        this.status = statusCode;
        this.detailedCode = detailedCode;
        this.message = message;
    }
}