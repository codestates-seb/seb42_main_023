package com.teamdragon.dragonmoney.app.global.exception;

import lombok.Getter;

@Getter
public enum BusinessExceptionCode {
    BAD_REQUEST(400, null, "Bad Request"),
    USER_EXISTS(409, null, "User already exists"),
    USER_NOT_FOUND(404, null, "User not found"),
    CATEGORY_NOT_FOUND(404, null, "Category not found"),
    POSTS_NOT_FOUND(404, null, "Posts not found"),
    COMMENT_NOT_FOUND(404, null, "Comment not found"),
    REPLY_NOT_FOUND(404, null, "Reply not found"),
    THUMBUP_NOT_FOUND(404, null, "Thumbup not found"),
    THUMBDOWN_NOT_FOUND(404, null, "Thumbdown not found"),
    BOOKMARK_NOT_FOUND(404, null, "Bookmark not found"),
    REPORT_NOT_FOUND(404, null, "Report not found"),
    IMAGE_SIZE_ZERO(400, null, "Image size is zero"),
    IMAGE_SIZE_EXCEED(400, null, "Image size exceed"),
    IMAGE_EXTENSION_NOT_VALID(400, null, "Image extension is not valid"),
    IMAGE_UPLOAD_FAIL(500, null, "Image upload fail"),
    IMAGE_REMOVE_FAIL(500, null, "Image remove fail");

    private final int status;
    private final Integer detailedCode;
    private final String message;

    BusinessExceptionCode(int statusCode, Integer detailedCode, String message) {
        this.status = statusCode;
        this.detailedCode = detailedCode;
        this.message = message;
    }
}