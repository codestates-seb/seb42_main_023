package com.teamdragon.dragonmoney.app.domain.thumb;

import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.service.ThumbCountAction;

public interface ThumbCountService {
    ThumbDto modifyThumbState(Long targetId, boolean needInquiry, Thumb.Type thumbType, ThumbCountAction action);
    ThumbDto modifyThumbupState(ThumbCountable thumbCountable, boolean needInquiry, ThumbCountAction action);
    ThumbDto modifyThumbdownState(ThumbCountable thumbCountable, boolean needInquiry, ThumbCountAction action);
}
