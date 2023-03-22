package com.teamdragon.dragonmoney.app.domain.reply.repository;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.reply.dto.ReplyDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReplyRepositoryCustom {

    // 목록 조회 : 미로그인
    Page<ReplyDto.ReplyListElement> findReplyListByPage(Pageable pageable, Long commentId);
    // 목록 조회 : 로그인
    Page<ReplyDto.ReplyListElement> findReplyListByPageAndMemberId(Pageable pageable, Long commentId, Long loginMemberId);

    Long updateThumbupCountPlus(Long replyId);
    Long updateThumbupCountMinus(Long replyId);
    Long updateThumbdownCountPlus(Long replyId);
    Long updateThumbdownCountMinus(Long replyId);
}
