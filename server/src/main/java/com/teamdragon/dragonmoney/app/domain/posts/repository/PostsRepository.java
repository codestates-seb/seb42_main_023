package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostsRepository extends JpaRepository<Posts, Long>, PostsRepositoryCustom {
}

