package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentRepositoryCustom {

    // 목록 조회 : 미로그인
    Page<CommentDto.CommentListElement> findCommentListByPage(Pageable pageable, Long postsId);
    // 목록 조회 : 로그인
    Page<CommentDto.CommentListElement> findCommentListByPageAndMemberId(Pageable pageable, Long postsId, Long loginMemberId);

    // 마이 페이지
    Long findMemberCommentCount(String memberName);
    Long findMemberThumbUpCommentCount(String memberName);
    Page<Comment> findCommentListByMemberName(Pageable pageable, String memberName);
    Page<Comment> findThumbUpCommentListByMemberName(Pageable pageable, String memberName);

    // 댓글 조회 : 탈퇴회원 닉네임
    List<Comment> findCommentByDeletedMember(String memberName);
}
