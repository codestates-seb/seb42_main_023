package com.teamdragon.dragonmoney.app.domain.thumb.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentFindService;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentHandleService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsFindService;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleService;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyFindService;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyHandleService;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
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
public class ThumbHandleServiceImpl implements ThumbHandleService {

    private final ThumbFindService thumbFindService;
    private final ThumbRepository thumbRepository;
    private final MemberFindService memberFindService;
    private final PostsFindService postsFindService;
    private final PostsHandleService postsHandleService;
    private final CommentFindService commentFindService;
    private final CommentHandleService commentHandleService;
    private final ReplyFindService replyFindService;
    private final ReplyHandleService replyHandleService;

    // 좋아요 등록
    public ThumbDto saveThumb(ThumbTargetType targetType, String loginMemberName, Long targetId, Thumb.Type currentTaskThumbType) {
        Member loginMember = getLoginMember(loginMemberName);
        // 좋아요 등록 전 처리
        if (saveThumbPreprocess(targetType, targetId, loginMember, currentTaskThumbType))
            return updateThumbCount(targetType, targetId, ThumbCountAction.PLUS, true, currentTaskThumbType);

        // 좋아요 신규 등록
        Thumb.ThumbBuilder builder = Thumb.builder();
        builder.member(loginMember);
        builder.thumbType(currentTaskThumbType);
        switch (targetType) {
            case POSTS:
                Posts findPosts = postsFindService.findOneStateActive(targetId);
                builder.parentPosts(findPosts);
                break;
            case COMMENT:
                Comment findComment = commentFindService.findOneStateActive(targetId);
                builder.parentComment(findComment);
                break;
            case REPLY:
                Reply findReply = replyFindService.findOneStateActive(targetId);
                builder.parentReply(findReply);
                break;
            default:
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        Thumb thumb = builder.build();
        thumbRepository.save(thumb);
        return updateThumbCount(targetType, targetId, ThumbCountAction.PLUS, true, currentTaskThumbType);
    }

    // 좋아요 전처리
    private boolean saveThumbPreprocess(ThumbTargetType targetType, Long targetId, Member loginMember, Thumb.Type currentTaskThumbType) {
        Optional<Thumb> findThumb = thumbFindService.findThumb(targetType, loginMember, targetId);
        if (findThumb.isPresent()) {
            Thumb originalThumb = findThumb.get();
            if (originalThumb.getThumbType() == currentTaskThumbType) {
                if (currentTaskThumbType == Thumb.Type.UP) {
                    throw new BusinessLogicException(BusinessExceptionCode.THUMBUP_EXIST);
                } else {
                    throw new BusinessLogicException(BusinessExceptionCode.THUMBDOWN_EXIST);
                }
            } else {
                if (currentTaskThumbType == Thumb.Type.UP) {
                    originalThumb.changeTypeToUp();
                } else {
                    originalThumb.changeTypeToDown();
                }
                thumbRepository.save(originalThumb);
                return true;
            }
        }
        return false;
    }

    // 좋아요 취소
    public ThumbDto removeThumb(ThumbTargetType targetType, String loginMemberName, Long targetId, Thumb.Type currentTaskThumbType) {
        Member loginMember = getLoginMember(loginMemberName);
        Thumb verifyThumb = thumbFindService.findVerifyThumb(targetType, loginMember, targetId, currentTaskThumbType);
        Thumb.Type thumbType = verifyThumb.getThumbType();
        if (thumbType != currentTaskThumbType) {
            if (thumbType == Thumb.Type.UP) {
                throw new BusinessLogicException(BusinessExceptionCode.THUMBUP_NOT_FOUND);
            } else {
                throw new BusinessLogicException(BusinessExceptionCode.THUMBDOWN_NOT_FOUND);
            }
        }
        thumbRepository.delete(verifyThumb);
        return updateThumbCount(targetType, targetId, ThumbCountAction.MINUS, true, currentTaskThumbType);
    }

    // 좋아요 count 반영
    private ThumbDto updateThumbCount(ThumbTargetType targetType, Long targetId, ThumbCountAction action, boolean needInquiry, Thumb.Type currentTaskThumbType) {
        ThumbCountService thumbCountService;
        switch (targetType) {
            case POSTS:
                thumbCountService = (ThumbCountService) postsHandleService;
                break;
            case COMMENT:
                thumbCountService = (ThumbCountService) commentHandleService;
                break;
            case REPLY:
                thumbCountService = (ThumbCountService) replyHandleService;
                break;
            default :
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        return thumbCountService.modifyThumbState(targetId, needInquiry, currentTaskThumbType, action);
    }

    // 회원의 좋아요, 싫어요 모두 삭제
    public void removeAllThumbByMemberId(Long memberId) {
        thumbRepository.deleteByMember_Id(memberId);
    }

    // 회원 조회
    private Member getLoginMember(String loginMemberName) {
        return memberFindService.findVerifyMemberByName(loginMemberName);
    }
}
