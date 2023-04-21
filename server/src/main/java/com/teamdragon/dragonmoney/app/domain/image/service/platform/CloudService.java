package com.teamdragon.dragonmoney.app.domain.image.service.platform;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CloudService {

    // 이미지 업로드
    String uploadFile(MultipartFile multipartFile, String ext, String fullFileName);

    // 여러 객체 삭제
    void removeFileList(List<String> storeFileNameKeys);
}
