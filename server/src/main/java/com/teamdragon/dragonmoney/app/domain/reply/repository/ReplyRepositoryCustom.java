package com.teamdragon.dragonmoney.app.domain.reply.repository;

import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.reply.dto.ReplyDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReplyRepositoryCustom {

    // 목록 조회 : 미로그인
    Page<ReplyDto.ReplyListElement> findReplyListByPage(Pageable pageable, Long commentId);
    // 목록 조회 : 로그인
    Page<ReplyDto.ReplyListElement> findReplyListByPageAndMemberId(Pageable pageable, Long commentId, Long loginMemberId);

    // 회원 탈퇴로 인한 답글 삭제
    void deletedReplyByDeletedMember(Member member, DeleteResult deleteResult);
}
