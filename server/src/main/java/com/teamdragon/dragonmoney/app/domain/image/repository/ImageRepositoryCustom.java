package com.teamdragon.dragonmoney.app.domain.image.repository;

import java.util.List;

public interface ImageRepositoryCustom {
    // List 에 해당하는 복수 image 삭제
    void deleteImagesByIds(List<Long> imageIds);
}
