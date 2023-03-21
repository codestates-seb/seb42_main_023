package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts, Long>, PostsRepositoryCustom {


    // 게시글 조회 : 요청페이지번호, 정렬기준

    // 게시글 목록 조회 : 태그목록 + 제목

    // 게시글 목록 조회 : 작성자 닉네임

    // 태그명으로 PostTag count 조회
}

