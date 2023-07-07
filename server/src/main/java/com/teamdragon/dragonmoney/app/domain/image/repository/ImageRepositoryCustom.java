package com.teamdragon.dragonmoney.app.domain.image.repository;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;

import java.time.LocalDateTime;
import java.util.List;

public interface ImageRepositoryCustom {
    // 이미지 조회 : id List 에 해당하는 복수 image 조회
    List<Image> findAllByIds(List<Long> imageIds);

    // 이미지 조회 : id List 와 회원 id 를 통한 조회
    List<Image> findAllByIdsAndMemberId(List<Long> imageIds, Long memberId);

    // List 에 해당하는 복수 image 삭제
    void deleteImagesByIds(List<Long> imageIds);

    // 이미지 조회 : 고아 이미지 조회 : 아무 게시글에서도 참조되지 않는 이미지
    List<Image> findAllOrphanImageList(LocalDateTime createFrom, LocalDateTime createTo);
}
