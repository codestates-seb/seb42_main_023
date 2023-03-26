package com.teamdragon.dragonmoney.app.domain.thumb.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyService;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbdown;
import com.teamdragon.dragonmoney.app.domain.thumb.respository.ThumbdownRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbup;
import com.teamdragon.dragonmoney.app.domain.thumb.respository.ThumbupRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class ThumbService {

    private final ThumbupRepository thumbupRepository;
    private final ThumbdownRepository thumbdownRepository;
    private final PostsService postsService;
    private final CommentService commentService;
    private final ReplyService replyService;

    // 좋아요 등록
    public ThumbDto saveThumbup(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Thumbup.ThumbupBuilder builder = Thumbup.builder();
        // 좋아요 등록 전 싫어요 취소
        beforeThumbup(targetType, loginMember, targetId);
        builder.member(loginMember);
        switch (targetType) {
            case POSTS:
                Posts findPosts = postsService.findOne(targetId);
                builder.parentPosts(findPosts);
                break;
            case COMMENT:
                Comment findComment = commentService.findOne(targetId);
                builder.parentComment(findComment);
                break;
            case REPLY:
                Reply findReply = replyService.findOne(targetId);
                builder.parentReply(findReply);
                break;
            default:
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        Thumbup thumbup = builder.build();
        thumbupRepository.save(thumbup);
        return updateThumbupCount(targetType, targetId, ThumbDto.ACTION.PLUS, true);
    }

    // 좋아요 취소
    public ThumbDto removeThumbup(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Thumbup verifyThumbup = findVerifyThumbup(targetType, loginMember, targetId);
        thumbupRepository.delete(verifyThumbup);
        return updateThumbupCount(targetType, targetId, ThumbDto.ACTION.MINUS, true);
    }

    // 싫어요 등록
    public ThumbDto saveThumbdown(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Thumbdown.ThumbdownBuilder builder = Thumbdown.builder();
        // 싫어요 등록 전 좋아요 취소
        beforeThumbdown(targetType, loginMember, targetId);
        builder.member(loginMember);
        switch (targetType) {
            case POSTS:
                Posts findPosts = postsService.findOne(targetId);
                builder.parentPosts(findPosts);
                break;
            case COMMENT:
                Comment findComment = commentService.findOne(targetId);
                builder.parentComment(findComment);
                break;
            case REPLY:
                Reply findReply = replyService.findOne(targetId);
                builder.parentReply(findReply);
                break;
        }
        Thumbdown thumbdown = builder.build();
        thumbdownRepository.save(thumbdown);
        return updateThumbdownCount(targetType, targetId, ThumbDto.ACTION.PLUS, true);
    }

    // 싫어요 취소
    public ThumbDto removeThumbdown(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Thumbdown verifyThumbdown = findVerifyThumbdown(targetType, loginMember, targetId);
        thumbdownRepository.delete(verifyThumbdown);
        return updateThumbdownCount(targetType, targetId, ThumbDto.ACTION.MINUS, true);
    }

    // 좋아요 전 싫어요 취소
    private void beforeThumbup(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Optional<Thumbdown> findThumbdown = findThumbdown(targetType, loginMember, targetId);
        if (findThumbdown.isEmpty()) {
            return;
        }
        switch (targetType) {
            case POSTS:
                thumbdownRepository.deleteByMember_IdAndParentPosts_Id(loginMember.getId(), targetId);
                break;
            case COMMENT:
                thumbdownRepository.deleteByMember_IdAndParentComment_Id(loginMember.getId(), targetId);
                break;
            case REPLY:
                thumbdownRepository.deleteByMember_IdAndParentReply_Id(loginMember.getId(), targetId);
                break;
            default:
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        updateThumbdownCount(targetType, targetId, ThumbDto.ACTION.MINUS, false);
    }

    // 유효한 좋아요 찾기
    private Thumbup findVerifyThumbup(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Optional<Thumbup> findThumbup = findThumbup(targetType, loginMember, targetId);
        if (findThumbup.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.THUMBUP_NOT_FOUND);
        }
        return findThumbup.get();
    }

    // 좋아요 찾기
    private Optional<Thumbup> findThumbup(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Optional<Thumbup> findThumbup;
        switch (targetType) {
            case POSTS:
                findThumbup
                        = thumbupRepository.findByMember_IdAndParentPosts_Id(loginMember.getId(), targetId);
                break;
            case COMMENT:
                findThumbup
                        = thumbupRepository.findByMember_IdAndParentComment_Id(loginMember.getId(), targetId);
                break;
            case REPLY:
                findThumbup
                        = thumbupRepository.findByMember_IdAndParentReply_Id(loginMember.getId(), targetId);
                break;
            default:
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        return findThumbup;
    }

    // 좋아요 count 반영
    private ThumbDto updateThumbupCount(ThumbDto.Target targetType, Long targetId, ThumbDto.ACTION action, boolean needInquiry) {
        switch (targetType) {
            case POSTS:
                return postsService.thumbupStateUpdate(targetId, needInquiry, action);
            case COMMENT:
                return commentService.thumbupStateUpdate(targetId, needInquiry, action);
            case REPLY:
                return replyService.thumbupStateUpdate(targetId, needInquiry, action);
        }
        throw new RuntimeException("Invalid Thumb TargetType");
    }

    // 싫어요 count 반영
    private ThumbDto updateThumbdownCount(ThumbDto.Target targetType, Long targetId, ThumbDto.ACTION action, boolean needInquiry) {
        switch (targetType) {
            case POSTS:
                return postsService.thumbdownStateUpdate(targetId, needInquiry, action);
            case COMMENT:
                return commentService.thumbdownStateUpdate(targetId, needInquiry, action);
            case REPLY:
                return replyService.thumbdownStateUpdate(targetId, needInquiry, action);
        }
        throw new RuntimeException("Invalid Thumb TargetType");
    }

    // 싫어요 전 좋아요 취소
    private void beforeThumbdown(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Optional<Thumbup> findThumbup = findThumbup(targetType, loginMember, targetId);
        if (findThumbup.isEmpty()) {
            return;
        }
        switch (targetType) {
            case POSTS:
                thumbupRepository.deleteByMember_IdAndParentPosts_Id(loginMember.getId(), targetId);
                break;
            case COMMENT:
                thumbupRepository.deleteByMember_IdAndParentComment_Id(loginMember.getId(), targetId);
                break;
            case REPLY:
                thumbupRepository.deleteByMember_IdAndParentReply_Id(loginMember.getId(), targetId);
                break;
            default:
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        updateThumbupCount(targetType, targetId, ThumbDto.ACTION.MINUS, false);
    }

    // 유효한 싫어요 찾기
    private Thumbdown findVerifyThumbdown(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Optional<Thumbdown> findThumbdown = findThumbdown(targetType, loginMember, targetId);
        if (findThumbdown.isPresent()) {
            return findThumbdown.get();
        } else {
            throw new BusinessLogicException(BusinessExceptionCode.THUMBDOWN_NOT_FOUND);
        }
    }

    // 싫어요 찾기
    private Optional<Thumbdown> findThumbdown(ThumbDto.Target targetType, Member loginMember, Long targetId) {
        Optional<Thumbdown> findThumbdown;
        switch (targetType) {
            case POSTS:
                findThumbdown
                        = thumbdownRepository.findByMember_IdAndParentPosts_Id(loginMember.getId(), targetId);
                break;
            case COMMENT:
                findThumbdown
                        = thumbdownRepository.findByMember_IdAndParentComment_Id(loginMember.getId(), targetId);
                break;
            case REPLY:
                findThumbdown
                        = thumbdownRepository.findByMember_IdAndParentReply_Id(loginMember.getId(), targetId);
                break;
            default:
                throw new RuntimeException("Invalid Thumb TargetType");
        }
        return findThumbdown;
    }
}