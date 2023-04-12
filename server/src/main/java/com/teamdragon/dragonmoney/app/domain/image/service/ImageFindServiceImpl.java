package com.teamdragon.dragonmoney.app.domain.image.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class ImageFindServiceImpl implements ImageFindService {

    private final ImageRepository imageRepository;

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
}
