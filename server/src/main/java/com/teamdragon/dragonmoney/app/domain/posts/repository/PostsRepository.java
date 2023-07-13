package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostsRepository extends JpaRepository<Posts, Long>, PostsRepositoryCustom {

    // 조회수 증가
    @Modifying
    @Query("update Posts p set p.viewCount = p.viewCount + 1 where p.id = :postsId")
    void updatePlusViewCount(@Param("postsId") Long postsId);

    // 북마크수, 댓글수, 좋아요수, 싫어요 수 동기화
    @Modifying
    @Query("update Posts p " +
            "set " +
            "p.bookmarkCount = (select count(b) from Bookmark b where b.posts = p)," +
            "p.commentCount = (select count(c) from Comment c where c.posts = p)," +
            "p.thumbupCount = (select count(t) from Thumb t where t.parentPosts = p AND t.thumbType = :thumbTypeUp)," +
            "p.thumbdownCount = (select count(t) from Thumb t where t.parentPosts = p AND t.thumbType = :thumbTypeDown)")
    void updateCounts(@Param("thumbTypeUp") Thumb.Type thumbTypeUp, @Param("thumbTypeDown") Thumb.Type thumbTypeDown);
}

