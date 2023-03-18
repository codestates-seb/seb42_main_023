package com.teamdragon.dragonmoney.app.domain.posts.repository;

public interface PostsRepositoryCustom {
    Long updateThumbupCountPlus(Long postId);
    Long updateThumbupCountMinus(Long postId);
    Long updateThumbdownCountPlus(Long postId);
    Long updateThumbdownCountMinus(Long postId);
}
