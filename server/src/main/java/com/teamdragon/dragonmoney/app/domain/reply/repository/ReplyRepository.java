package com.teamdragon.dragonmoney.app.domain.reply.repository;

import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReplyRepository extends JpaRepository<Reply, Long>, ReplyRepositoryCustom {

    // 좋아요수, 싫어요수 동기화
    @Modifying
    @Query("update Reply r " +
            "set " +
            "r.thumbupCount = (select count(t.id) from Thumb t where t.parentReply = r AND t.thumbType = :thumbTypeUp)," +
            "r.thumbdownCount = (select count(t.id) from Thumb t where t.parentReply = r AND t.thumbType = :thumbTypeDown)")
    void updateCounts(@Param("thumbTypeUp") Thumb.Type thumbTypeUp, @Param("thumbTypeDown") Thumb.Type thumbTypeDown);
}
