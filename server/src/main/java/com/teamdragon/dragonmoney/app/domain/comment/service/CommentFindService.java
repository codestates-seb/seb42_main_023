package com.teamdragon.dragonmoney.app.domain.comment.service;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import org.springframework.data.domain.Page;

public interface CommentFindService {

    // 단일 조회 : Active 상태
    Comment findOneStateActive(Long commentId);

    // 목록 조회
    Page<CommentDto.CommentListElement> findCommentList(int page, Long postsId, Comment.OrderBy orderBy, Long loginMemberId);

    // 목록 조회 : 회원이 작성한 댓글 (마이 페이지)
    MyPageDto.MyPageMemberCommentListRes findCommentListByMember(int page, String memberName);

    // 목록 조회 : 회원이 좋아요 한 댓글 (마이 페이지)
    MyPageDto.MyPageMemberCommentListRes findThumbUpCommentListByMember(int page, String memberName);

    // 개수 조회 : 회원이 작성한 댓글 개수 (마이 페이지)
    Long findCommentCountByWriter(String memberName);

    // 개수 조회 : 회원이 좋아요 한 댓글 개수 (마이 페이지)
    Long findThumbUpCommentCountByMember(String memberName);

    // 유효한 Comment 조회
    Comment findVerifyCommentById(Long commentId);
}
