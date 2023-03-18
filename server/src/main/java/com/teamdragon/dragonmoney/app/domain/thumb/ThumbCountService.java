package com.teamdragon.dragonmoney.app.domain.thumb;

public interface ThumbCountService {
    Thumb thumbupPlusUpdate(Long targetId, boolean needInquiry);
    Thumb thumbupMinusUpdate(Long targetId, boolean needInquiry);
    Thumb thumbdownPlusUpdate(Long targetId, boolean needInquiry);
    Thumb thumbdownMinusUpdate(Long targetId, boolean needInquiry);
}
