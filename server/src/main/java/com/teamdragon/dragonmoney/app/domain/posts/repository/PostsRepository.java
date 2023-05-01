package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostsRepository extends JpaRepository<Posts, Long>, PostsRepositoryCustom {

    // 조회수 증가
    @Modifying
    @Query("update Posts p set p.viewCount = p.viewCount + 1 where p.id = :postsId")
    void updatePlusViewCount(@Param("postsId") Long postsId);
}

