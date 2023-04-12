package com.teamdragon.dragonmoney.app.domain.comment.service;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;

public interface CommentFindService {

    // 단일 조회 : Active 상태
    Comment findOneStateActive(Long commentId);

    // 목록 조회
    Page<CommentDto.CommentListElement> findCommentList(int page, Long postsId, Comment.OrderBy orderBy, Long loginMemberId);

    // 마이 페이지 특정 회원이 쓴 댓글 조회
    Page<Comment> findCommentListByMember(String memberName, int page, Comment.OrderBy orderBy);

    // 마이 페이지 특정 회원이 좋아요 한 댓글 조회
    Page<Comment> findThumbUpCommentListByMember(String memberName, int page, Comment.OrderBy orderBy);

    // 유효한 Comment 조회
    Comment findVerifyCommentById(Long commentId);
}
