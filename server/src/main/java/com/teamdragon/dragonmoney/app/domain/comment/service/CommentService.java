package com.teamdragon.dragonmoney.app.domain.comment.service;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.global.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService implements ThumbCountService {

    private final CommentRepository commentRepository;
    private final PostsService postsService;

    private final int PAGE_ELEMENT_SIZE = 10;

    // 단일 조회
    public Comment findOne(Long commentId) {
        return findVerifyCommentById(commentId);
    }

    // 추가
    public Comment createComment(Long postsId, Member loginMember, Comment newComment) {
        Posts parentPosts = postsService.findOne(postsId);
        Comment comment = Comment.builder()
                .content(newComment.getContent())
                .writer(loginMember)
                .posts(parentPosts)
                .build();
        return commentRepository.save(comment);
    }

    // 삭제
    public Long removeComment(Member loginMember, Long commentId) {
        Comment findComment = checkOwner(loginMember, commentId);
        DeleteResult deleteResult
                = DeleteResult.builder().deleteReason(DeleteResult.Reason.SELF_DELETED).build();
        findComment.changeStateToDeleted(deleteResult);
        commentRepository.save(findComment);
        return commentId;
    }

    // 수정
    public Comment updateComment(Member loginMember, Long commentId, Comment updateComment) {
        Comment findComment = checkOwner(loginMember, commentId);
        findComment.updateContent(updateComment.getContent());
        return commentRepository.save(findComment);
    }

    // 목록 조회
    public Page<CommentDto.CommentListElement> findCommentList(int page, Long postsId, Comment.OrderBy orderBy, Long loginMemberId) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        if (loginMemberId == null ) {
            return commentRepository.findCommentListByPage(pageable, postsId);
        } else {
            return commentRepository.findCommentListByPageAndMemberId(pageable, postsId, loginMemberId);
        }
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

    // 작성자 확인
    private Comment checkOwner(Member loginMember, Long commenmtId) {
        Comment findComment = findVerifyCommentById(commenmtId);
        if (findComment.getWriter().getId().equals(loginMember.getId())) {
            throw new AuthLogicException(AuthExceptionCode.AUTHORIZED_FAIL);
        }
        return findComment;
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
