package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long>, CommentRepositoryCustom {

    // 답글수, 좋아요수, 싫어요수 동기화
    @Modifying
    @Query("update Comment c " +
            "set " +
            "c.replyCount = (select count(r) from Reply r where r.comment = c)," +
            "c.thumbupCount = (select count(t) from Thumb t where t.parentComment = c AND t.thumbType = :thumbTypeUp)," +
            "c.thumbdownCount = (select count(t) from Thumb t where t.parentComment = c AND t.thumbType = :thumbTypeDown)")
    void updateCounts(@Param("thumbTypeUp") Thumb.Type thumbTypeUp, @Param("thumbTypeDown") Thumb.Type thumbTypeDown);
}
