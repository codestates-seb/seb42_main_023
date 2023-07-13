package com.teamdragon.dragonmoney.app.domain.reply.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;

import java.util.List;

public interface ReplyHandleService {

    Reply createReply(Long commentId, Member loginMember, Reply newReply);

    // 삭제
    Long removeReply(Member loginMember, Long replyId);

    // 여러 답글 삭제 : 부모 삭제로 인한 삭제
    void removeReplyListByParent(List<Reply> replies);

    // 신고에 의한 삭제
    void removeReplyByReport(Reply reply);

    // 회원 탈퇴로 인한 답글 삭제
    void removeReplyByDeletedMember(String memberName);

    // 수정
    Reply updateReply(Member loginMember, Long replyId, Reply updateReply);

    // 좋아요수, 싫어요수 동기화
    void updateCounts();
}
