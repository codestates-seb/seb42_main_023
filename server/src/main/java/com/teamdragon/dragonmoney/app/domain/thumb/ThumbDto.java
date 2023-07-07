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
}
