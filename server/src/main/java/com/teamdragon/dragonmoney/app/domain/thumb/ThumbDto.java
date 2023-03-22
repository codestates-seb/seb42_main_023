package com.teamdragon.dragonmoney.app.domain.thumb;

import lombok.Getter;

@Getter
public class ThumbDto {
    private final Long thumbupCount;
    private final Long thumbdownCount;

    public ThumbDto(Long thumbupCount, Long thumbdownCount) {
        this.thumbupCount = thumbupCount;
        this.thumbdownCount = thumbdownCount;
    }

    // 부모 대상 타입
    @Getter
    public enum Target {
        POSTS,
        COMMENT,
        REPLY;
        Target() {
        }
    }

    // 증감 액션
    @Getter
    public enum ACTION {
        PLUS,
        MINUS;
        ACTION() {
        }
    }
}
