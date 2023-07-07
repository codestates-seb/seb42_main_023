package com.teamdragon.dragonmoney.app.domain.image.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;

import java.util.List;

public interface ImageFindService {

    // 이미지들 검색
    List<Image> findImageList(List<Image> images);

    // 고아 이미지 검색
    List<Image> findOrphanImageList();
}
