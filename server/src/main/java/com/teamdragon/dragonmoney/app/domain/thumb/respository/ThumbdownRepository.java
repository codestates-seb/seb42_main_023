package com.teamdragon.dragonmoney.app.domain.thumb.respository;

import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbdown;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThumbdownRepository extends JpaRepository<Thumbdown, Long>{
    // 게시글
    // 싫어요 조회
    Optional<Thumbdown> findByMember_IdAndParentPosts_Id(Long memberId, Long postId);

    // 게시글 싫어요 취소
    void deleteByMember_IdAndParentPosts_Id(Long memberId, Long postId);

    // 댓글
    // 싫어요 조회
    Optional<Thumbdown> findByMember_IdAndParentComment_Id(Long memberId, Long commentId);

    // 댓글 싫어요 취소
    void deleteByMember_IdAndParentComment_Id(Long memberId, Long postId);

    // 답글
    // 싫어요 조회
    Optional<Thumbdown> findByMember_IdAndParentReply_Id(Long memberId, Long replyId);

    // 답글 싫어요 취소
    void deleteByMember_IdAndParentReply_Id(Long memberId, Long postId);
}
