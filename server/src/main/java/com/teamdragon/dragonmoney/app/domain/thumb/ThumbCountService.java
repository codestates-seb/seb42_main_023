package com.teamdragon.dragonmoney.app.domain.thumb;

public interface ThumbCountService {
    ThumbDto modifyThumbupState(Long postsId, boolean needInquiry, ThumbDto.ACTION action);
    ThumbDto modifyThumbdownState(Long postsId, boolean needInquiry, ThumbDto.ACTION action);
}
