package com.teamdragon.dragonmoney.app.domain.image.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class ImageScheduled {

    private final ImageFindService imageFindService;
    private final ImageHandleService imageHandleService;

    // 이미지 삭제 : 사용되지 않는 이미지 삭제
    @Scheduled(cron = "0 0 5 * * *")
    public void removeOrphanImages() {
        // 고아 이미지 검색
        List<Image> orphanImageList = imageFindService.findOrphanImageList();

        // 클라우드에서 삭제
        imageHandleService.removeImageListFromCloud(orphanImageList);

        // DB 에서 삭제
        imageHandleService.removeImageListFromDB(orphanImageList);
    }

}
