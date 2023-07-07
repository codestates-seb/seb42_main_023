package com.teamdragon.dragonmoney.app.domain.posts.repository;

import java.util.List;

public interface PostsTagRepositoryCustom {
    void deleteAllByPostsIdAndTagName(Long postsId, List<String> tagNames);
}
