package com.teamdragon.dragonmoney.app.domain.comment.service;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.common.service.FinderService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyService;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService implements ThumbCountService {

    private final CommentRepository commentRepository;
    private final FinderService finderService;
    private final ReplyService replyService;

    private static final int PAGE_ELEMENT_SIZE = 10;

    // 단일 조회 : Active 상태
    public Comment findOneStateActive(Long commentId) {
        Comment findComment = findVerifyCommentById(commentId);
        if (findComment.getState() != Comment.State.ACTIVE) {
            throw new BusinessLogicException(BusinessExceptionCode.THUMB_UNUSABLE);
        }
        return findComment;
    }

    // 추가
    public Comment createComment(Long postsId, Member loginMember, Comment newComment) {
        Posts parentPosts = finderService.findVerifyPostsById(postsId);
        parentPosts.plusCommentCount();
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
        Posts parentPosts = findComment.getPosts();
        DeleteResult deleteResult
                = DeleteResult.builder().deleteReason(DeleteResult.Reason.SELF_DELETED).build();
        findComment.changeStateToDeleted(deleteResult);
        return commentId;
    }

    // 여러 댓글 삭제 : 부모 삭제로 인한 삭제
    public void removeCommentsByParent(List<Comment> comments) {
        for (Comment comment : comments) {
            comment.changeStateToDeleted(new DeleteResult(DeleteResult.Reason.DELETED_BY_PARENT));
            replyService.removeReplyListByParent(comment.getReplies());
        }
        commentRepository.saveAll(comments);
    }

    // 신고로 인한 삭제
    public void removeCommentByReport(Comment comment) {
        DeleteResult deleteResult
                = DeleteResult.builder().deleteReason(DeleteResult.Reason.DELETED_BY_REPORT).build();
        comment.changeStateToDeleted(deleteResult);
        // 답글 삭제
        replyService.removeReplyListByParent(comment.getReplies());
        commentRepository.save(comment);
    }

    // 회원 탈퇴로 인한 댓글 삭제
    public void removeCommentByDeletedMember(String memberName) {
        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.DELETED_BY_MEMBER_REMOVE)
                .build();

        List<Comment> comments = commentRepository.findCommentByDeletedMember(memberName);
        for(Comment addDeletedResultByComment : comments) {
            addDeletedResultByComment.changeStateToDeleted(deleteResult);
        }

        commentRepository.saveAll(comments);
    }

    // 수정
    public Comment modifyComment(Member loginMember, Long commentId, Comment updateComment) {
        Comment originalComment = checkOwner(loginMember, commentId);
        originalComment.isModifiedNow();
        originalComment.updateContent(updateComment.getContent());
        return commentRepository.save(originalComment);
    }

    // 목록 조회
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

    // 마이 페이지 특정 회원이 쓴 댓글 조회
    public Page<Comment> findCommentListByMember(String memberName, int page, Comment.OrderBy orderBy) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        return commentRepository.findCommentListByMemberName(pageable, memberName);
    }

    // 마이 페이지 특정 회원이 좋아요 한 댓글 조회
    public Page<Comment> findThumbUpCommentListByMember(String memberName, int page, Comment.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        return commentRepository.findThumbUpCommentListByMemberName(pageable, memberName);
    }

    @Override
    public ThumbDto modifyThumbupState(Long commentId, boolean needInquiry, ThumbDto.ACTION action) {
        Comment findComment = findVerifyCommentById(commentId);
        if (action == ThumbDto.ACTION.PLUS) {
            findComment.plusThumbupCount();
        } else if ( action == ThumbDto.ACTION.MINUS) {
            findComment.minusThumbupCount();
        }
        Comment updateComment = commentRepository.save(findComment);
        if (needInquiry) {
            return updateComment.getThumbCount();
        }
        return null;
    }

    @Override
    public ThumbDto modifyThumbdownState(Long commentId, boolean needInquiry, ThumbDto.ACTION action) {
        Comment findComment = findVerifyCommentById(commentId);
        if (action == ThumbDto.ACTION.PLUS) {
            findComment.plusThumbdownCount();
        } else if ( action == ThumbDto.ACTION.MINUS) {
            findComment.minusThumbdownCount();
        }
        Comment updateComment = commentRepository.save(findComment);
        if (needInquiry) {
            return updateComment.getThumbCount();
        }
        return null;
    }

    // 작성자 확인
    private Comment checkOwner(Member loginMember, Long commenmtId) {
        Comment findComment = findVerifyCommentById(commenmtId);
        if (!findComment.getWriter().getId().equals(loginMember.getId())) {
            throw new AuthLogicException(AuthExceptionCode.AUTHORIZED_FAIL);
        }
        return findComment;
    }

    // 유효한 Comment 조회
    private Comment findVerifyCommentById(Long commentId) {
        Optional<Comment> findComment = commentRepository.findById(commentId);
        if (findComment.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.COMMENT_NOT_FOUND);
        }
        return findComment.get();
    }
}
