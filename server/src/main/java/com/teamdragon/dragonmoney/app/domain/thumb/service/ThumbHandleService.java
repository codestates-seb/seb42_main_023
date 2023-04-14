package com.teamdragon.dragonmoney.app.domain.thumb.service;

import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;

public interface ThumbHandleService {

    ThumbDto saveThumb(ThumbTargetType targetType, String loginMemberName, Long targetId, Thumb.Type currentTaskThumbType);

    // 좋아요 취소
    ThumbDto removeThumb(ThumbTargetType targetType, String loginMemberName, Long targetId, Thumb.Type currentTaskThumbType);

    // 회원의 좋아요, 싫어요 모두 삭제
    void removeAllThumbByMemberId(Long memberId);
}
