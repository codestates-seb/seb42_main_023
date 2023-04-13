package com.teamdragon.dragonmoney.app.domain.comment.service;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentFindServiceImpl implements CommentFindService {

    private final CommentRepository commentRepository;
    private static final int PAGE_ELEMENT_SIZE = 10;
    private static final String PAGE_ELEMENT_ORDER_BY = "latest";

    // 단일 조회 : Active 상태
    @Override
    public Comment findOneStateActive(Long commentId) {
        Comment findComment = findVerifyCommentById(commentId);
        if (findComment.getState() != Comment.State.ACTIVE) {
            throw new BusinessLogicException(BusinessExceptionCode.THUMB_UNUSABLE);
        }
        return findComment;
    }

    // 목록 조회
    @Override
    public Page<CommentDto.CommentListElement> findCommentList(int page, Long postsId, Comment.OrderBy orderBy, Long loginMemberId) {
        Pageable pageable;
        if (orderBy == Comment.OrderBy.THUMBUP) {
            pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE,
                    Sort.by(orderBy.getTargetProperty()).descending()
                            .and(Sort.by(Comment.OrderBy.LATEST.getTargetProperty()).descending()));
        } else {
            pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        }
        if (loginMemberId == null ) {
            return commentRepository.findCommentListByPage(pageable, postsId);
        } else {
            return commentRepository.findCommentListByPageAndMemberId(pageable, postsId, loginMemberId);
        }
    }

    // 목록 조회 : 회원이 작성한 댓글 (마이 페이지)
    @Override
    public MyPageDto.MyPageMemberCommentListRes findCommentListByMember(int page, String memberName) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(Comment.OrderBy.LATEST.getTargetProperty()).descending());
        Page<Comment> commentPage = commentRepository.findCommentListByMemberName(pageable, memberName);

        return new MyPageDto.MyPageMemberCommentListRes(commentPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 목록 조회 : 회원이 좋아요 한 댓글 (마이 페이지)
    @Override
    public MyPageDto.MyPageMemberCommentListRes findThumbUpCommentListByMember(int page, String memberName) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(Comment.OrderBy.LATEST.getTargetProperty()).descending());
        Page<Comment> commentPage = commentRepository.findThumbUpCommentListByMemberName(pageable, memberName);

        return new MyPageDto.MyPageMemberCommentListRes(commentPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 유효한 Comment 조회
    @Override
    public Comment findVerifyCommentById(Long commentId) {
        Optional<Comment> findComment = commentRepository.findById(commentId);
        if (findComment.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.COMMENT_NOT_FOUND);
        }
        return findComment.get();
    }
}
