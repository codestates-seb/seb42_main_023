package com.teamdragon.dragonmoney.app.domain.thumb;

public interface ThumbCountService {
    ThumbDto thumbupStateUpdate(Long postsId, boolean needInquiry, ThumbDto.ACTION action);
    ThumbDto thumbdownStateUpdate(Long postsId, boolean needInquiry, ThumbDto.ACTION action);
}
