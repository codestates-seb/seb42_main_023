package com.teamdragon.dragonmoney.app.domain.thumb;

import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.service.ThumbCountAction;

public interface ThumbCountService {
    ThumbDto modifyThumbState(Long targetId, Thumb.Type thumbType, ThumbCountAction action, boolean isChange);
    ThumbDto modifyThumbupState(ThumbCountable thumbCountable, ThumbCountAction action, boolean isChange);
    ThumbDto modifyThumbdownState(ThumbCountable thumbCountable, ThumbCountAction action, boolean isChange);
}
