package com.teamdragon.dragonmoney.app.domain.image.repository;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;

import java.util.List;

public interface ImageRepositoryCustom {
    // List 에 해당하는 복수 image 조회
    List<Image> findAllByIds(List<Long> imageIds);

    // void updatePostsByIds(List<Long> imageIds, Posts posts);
    List<Image> findAllByIdsAndMemberId(List<Long> imageIds, Long memberId);

    void updatePostsByIds(List<Long> imageIds, Posts posts);

    // List 에 해당하는 복수 image 삭제
    void deleteImagesByIds(List<Long> imageIds);
}
