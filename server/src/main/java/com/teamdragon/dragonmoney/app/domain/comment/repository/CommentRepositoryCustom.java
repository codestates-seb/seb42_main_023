package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentRepositoryCustom {

    // 목록 조회 : 미로그인
    Page<CommentDto.CommentListElement> findCommentListByPage(Pageable pageable, Long postsId);
    // 목록 조회 : 로그인
    Page<CommentDto.CommentListElement> findCommentListByPageAndMemberId(Pageable pageable, Long postsId, Long loginMemberId);

    Long updateThumbupCountPlus(Long commentId);
    Long updateThumbupCountMinus(Long commentId);
    Long updateThumbdownCountPlus(Long commentId);
    Long updateThumbdownCountMinus(Long commentId);
}
