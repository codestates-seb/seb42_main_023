package com.teamdragon.dragonmoney.app.domain.image.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class ImageFindServiceImpl implements ImageFindService {

    private final ImageRepository imageRepository;
    private static final Integer MAX_CREATABLE_TIME = 30;

    // 이미지들 검색
    @Override
    public List<Image> findImageList(List<Image> images) {
        if (images == null || images.isEmpty()) {
            return null;
        }
        List<Long> imageIds = images.stream()
                .map(Image::getId)
                .collect(Collectors.toList());
        return imageRepository.findAllByIds(imageIds);
    }

    // 고아 이미지 검색
    @Override
    public List<Image> findOrphanImageList() {
        LocalDateTime now = LocalDateTime.now();

        LocalDateTime createFrom = now.minusMinutes(MAX_CREATABLE_TIME);
        return imageRepository.findAllOrphanImageList(createFrom, now);
    }
}
