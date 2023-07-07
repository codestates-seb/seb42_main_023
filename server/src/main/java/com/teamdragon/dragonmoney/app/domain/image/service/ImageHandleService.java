package com.teamdragon.dragonmoney.app.domain.image.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageHandleService {

    // 이미지 업로드
    Image createImage(Member loginMember, MultipartFile multipartFile);

    // 이미지들 삭제
    void removeImageList(Member loginMember, List<Image> removeImages);

    // 복수 이미지 삭제 : DB
    void removeImageListFromDB(List<Image> removeImages);

    // 복수 이미지 삭제 : 클라우드
    void removeImageListFromCloud(List<Image> removeImages);

    // 이미지 크기 확인
    Boolean checkFileSize(MultipartFile multipartFile);
}
