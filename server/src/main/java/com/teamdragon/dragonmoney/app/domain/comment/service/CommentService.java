package com.teamdragon.dragonmoney.app.domain.comment.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService implements ThumbCountService {

    private final CommentRepository commentRepository;

    public Comment findOne(Long commentId) {
        return null;
    }

    @Override
    public Thumb thumbupPlusUpdate(Long commentId, boolean needInquiry) {
        commentRepository.updateThumbupCountPlus(commentId);
        return getThumbByNeedInquiry(needInquiry, commentId);
    }

    @Override
    public Thumb thumbupMinusUpdate(Long commentId, boolean needInquiry) {
        commentRepository.updateThumbupCountMinus(commentId);
        return getThumbByNeedInquiry(needInquiry, commentId);
    }

    @Override
    public Thumb thumbdownPlusUpdate(Long commentId, boolean needInquiry) {
        commentRepository.updateThumbdownCountPlus(commentId);
        return getThumbByNeedInquiry(needInquiry, commentId);
    }

    @Override
    public Thumb thumbdownMinusUpdate(Long commentId, boolean needInquiry) {
        commentRepository.updateThumbdownCountMinus(commentId);
        return getThumbByNeedInquiry(needInquiry, commentId);
    }

    // 조회 필요 여부에 따른 좋아요,싫어요 정보 반환
    private Thumb getThumbByNeedInquiry(boolean needInquiry, Long commentId) {
        if (needInquiry) {
            return findVerifyCommentById(commentId).getThumbCount();
        }
        return null;
    }

    // 유효한 Posts 조회
    private Comment findVerifyCommentById(Long commentId) {
        Optional<Comment> findComment = commentRepository.findById(commentId);
        if (findComment.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.COMMENT_NOT_FOUND);
        }
        return findComment.get();
    }
}
