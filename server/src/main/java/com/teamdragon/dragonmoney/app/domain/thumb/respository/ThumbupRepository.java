package com.teamdragon.dragonmoney.app.domain.thumb.respository;

import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThumbupRepository extends JpaRepository<Thumbup, Long> {
    // 게시글
    // 좋아요 조회
    Optional<Thumbup> findByMember_IdAndParentPosts_Id(Long memberId, Long postId);

    // 게시글 좋아요 취소
    void deleteByMember_IdAndParentPosts_Id(Long memberId, Long postId);

    // 댓글
    // 좋아요 조회
    Optional<Thumbup> findByMember_IdAndParentComment_Id(Long memberId, Long commentId);

    // 댓글 좋아요 취소
    void deleteByMember_IdAndParentComment_Id(Long memberId, Long postId);

    // 답글
    // 좋아요 조회
    Optional<Thumbup> findByMember_IdAndParentReply_Id(Long memberId, Long replyId);

    // 답글 좋아요 취소
    void deleteByMember_IdAndParentReply_Id(Long memberId, Long postId);

    // 좋아요 삭제 : 회원 아이디
    void deleteByMember_Id(Long memberId);
}
