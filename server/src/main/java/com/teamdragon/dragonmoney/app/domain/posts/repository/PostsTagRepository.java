package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsTagRepository extends JpaRepository<PostsTag, Long>, PostsTagRepositoryCustom{
    void deleteByPosts_Id(Long postsId);
}
