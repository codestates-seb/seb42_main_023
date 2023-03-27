package com.teamdragon.dragonmoney.app.domain.bookmark.dto;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import lombok.Getter;
import lombok.Setter;

@Getter
public class BookmarkDto {
    private Boolean isBookmarked;

    public BookmarkDto(Boolean isBookmarked) {
        this.isBookmarked = isBookmarked;
    }
}
