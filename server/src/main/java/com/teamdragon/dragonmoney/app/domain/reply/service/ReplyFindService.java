package com.teamdragon.dragonmoney.app.domain.reply.service;

import com.teamdragon.dragonmoney.app.domain.reply.dto.ReplyDto;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import org.springframework.data.domain.Page;

public interface ReplyFindService {

    Reply findOneStateActive(Long postsId);

    // 목록 조회
    Page<ReplyDto.ReplyListElement> findReplyList(int page, Long commentId, Reply.OrderBy orderBy, Long loginMemberId);

    // 유효한 Reply 조회
    Reply findVerifyReplyById(Long replyId);
}
