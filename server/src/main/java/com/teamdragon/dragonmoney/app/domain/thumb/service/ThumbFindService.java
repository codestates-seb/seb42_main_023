package com.teamdragon.dragonmoney.app.domain.thumb.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;

import java.util.Optional;

public interface ThumbFindService {

    Thumb findVerifyThumb(ThumbTargetType targetType, Member loginMember, Long targetId, Thumb.Type currentTaskThumbType);

    // 좋아요 찾기
    Optional<Thumb> findThumb(ThumbTargetType targetType, Member loginMember, Long targetId);
}
