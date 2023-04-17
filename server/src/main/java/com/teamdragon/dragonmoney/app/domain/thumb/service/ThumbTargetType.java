package com.teamdragon.dragonmoney.app.domain.thumb.service;

import lombok.Getter;

// 부모 대상 타입
@Getter
public enum ThumbTargetType {
    POSTS,
    COMMENT,
    REPLY;
    ThumbTargetType() {
    }
}
