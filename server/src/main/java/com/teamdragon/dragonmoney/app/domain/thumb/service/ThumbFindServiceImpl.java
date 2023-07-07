package com.teamdragon.dragonmoney.app.domain.thumb.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.respository.ThumbRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class ThumbFindServiceImpl implements ThumbFindService {

    private final ThumbRepository thumbRepository;

    // 유효한 좋아요 찾기
    public Thumb findVerifyThumb(ThumbTargetType targetType, Member loginMember, Long targetId, Thumb.Type currentTaskThumbType) {
        Optional<Thumb> findThumb = findThumb(targetType, loginMember, targetId);
        if (findThumb.isPresent()) {
            return findThumb.get();
        } else {
            if (currentTaskThumbType == Thumb.Type.UP) {
                throw new BusinessLogicException(BusinessExceptionCode.THUMBUP_NOT_FOUND);
            } else {
                throw new BusinessLogicException(BusinessExceptionCode.THUMBDOWN_NOT_FOUND);
            }
        }
    }

    // 좋아요 찾기
    public Optional<Thumb> findThumb(ThumbTargetType targetType, Member loginMember, Long targetId) {
        Optional<Thumb> findThumbup;
        switch (targetType) {
            case POSTS:
                findThumbup
                        = thumbRepository.findByMember_IdAndParentPosts_Id(loginMember.getId(), targetId);
                break;
            case COMMENT:
                findThumbup
                        = thumbRepository.findByMember_IdAndParentComment_Id(loginMember.getId(), targetId);
                break;
            case REPLY:
                findThumbup
                        = thumbRepository.findByMember_IdAndParentReply_Id(loginMember.getId(), targetId);
                break;
            default:
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        return findThumbup;
    }
}
