package com.teamdragon.dragonmoney.app.domain.bookmark.dto;

import lombok.Getter;

@Getter
public class BookmarkDto {
    private Boolean isBookmarked;

    public BookmarkDto(Boolean isBookmarked) {
        this.isBookmarked = isBookmarked;
    }
}
