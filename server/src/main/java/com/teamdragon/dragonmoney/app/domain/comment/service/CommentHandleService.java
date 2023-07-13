package com.teamdragon.dragonmoney.app.domain.comment.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

import java.util.List;

public interface CommentHandleService {

    // 추가
    Comment createComment(Long postsId, Member loginMember, Comment newComment);

    // 삭제
    Long removeComment(Member loginMember, Long commentId);

    // 여러 댓글 삭제 : 부모 삭제로 인한 삭제
    void removeCommentsByParent(List<Comment> comments);

    // 신고로 인한 삭제
    void removeCommentByReport(Comment comment);

    // 회원 탈퇴로 인한 댓글 삭제
    void removeCommentByDeletedMember(String memberName);

    // 수정
    Comment modifyComment(Member loginMember, Long commentId, Comment updateComment);

    // 답글수, 좋아요수, 싫어요수 동기화
    void updateCounts();
}
