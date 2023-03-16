package com.teamdragon.dragonmoney.app.domain.image.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.repository.ImageRepository;
import com.teamdragon.dragonmoney.app.domain.image.service.platform.S3Service;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class ImageService {

    // 이미지 최대 크기 : 2MB : 2,000,000
    @Value("${file.upload-max-size}")
    private Integer FILE_MAX_SIZE;

    // 허용 이미지 확장자
    private final String[] PERMISSION_FILE_EXT_ARR = {"GIF", "JPEG", "JPG", "PNG"};

    private final S3Service s3Service;
    private final ImageRepository imageRepository;

    // 이미지 업로드
    public Image saveImage(Member loginMember, MultipartFile multipartFile) {
        String originalFilename = multipartFile.getOriginalFilename();
        String ext = extractExt(originalFilename);
        String storeFileName = createStoreFileName(originalFilename);

        String url = uploadImageToCloud(multipartFile, ext, storeFileName);
        return saveImageToDB(url, ext, storeFileName);
    }

    // 이미지들 삭제
    public void removeImages(Member loginMember, List<Image> reqImages) {
        List<Image> deleteImages = new ArrayList<>();
        // 업로더 본인 확인
        for (Image reqImage : reqImages) {
            Optional<Image> verifyImage = findVerifyImage(reqImage.getFileName());
            if (verifyImage.isPresent()){
                Image image = verifyImage.get();
                if (image.getUploader().getId().equals(loginMember.getId())) {
                    deleteImages.add(image);
                }
            }
        }
        // 클라우드 복수 이미지 삭제
        removeImagesFromCloud(deleteImages);

        // DB 삭제
        saveImageFromDB(deleteImages);
    }

    // 복수 이미지 삭제 : DB
    private void saveImageFromDB(List<Image> deleteImages) {
        List<Long> imageIds = deleteImages.stream()
                .map(Image::getId)
                .collect(Collectors.toList());
        imageRepository.deleteImagesByIds(imageIds);
    }

    // 복수 이미지 삭제 : 클라우드
    private void removeImagesFromCloud(List<Image> deleteImages) {
        List<String> deleteFileNames = deleteImages.stream()
                .map(Image::getFileName)
                .collect(Collectors.toList());
        s3Service.removeFiles(deleteFileNames);
    }

    // 이미지 단일 조회 : fileName
    private Optional<Image> findVerifyImage(String fileName) {
        return imageRepository.findByFileName(fileName);
    }

    // 이미지 업로드 : 클라우드
    private String uploadImageToCloud(MultipartFile multipartFile, String ext, String storeFileName)  {
        try {
            String url = s3Service.uploadFile(multipartFile, ext, storeFileName);
            return url;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    // 이미지 저장 : DB
    private Image saveImageToDB(String url, String ext, String storeFileName) {
        Image image = Image.builder()
                .url(url)
                .fileName(storeFileName)
                .extension(ext)
                .state(Image.State.WRITING)
                .build();
        return imageRepository.save(image);
    }

    // 이미지 크기 확인
    public Boolean checkFileSize(MultipartFile multipartFile) {

        if (multipartFile.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_SIZE_ZERO);
        }
        long size = multipartFile.getSize();

        if (size >  FILE_MAX_SIZE) {
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_SIZE_EXCEED);
        } else if (size == 0) {
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_SIZE_ZERO);
        } else {
            return true;
        }
    }

    // 이미지 확장자 검증
    private boolean isVerificationExt(MultipartFile multipartFile ) {
        String ext = extractExt(multipartFile.getOriginalFilename());
        String upperExt = ext.toUpperCase();

        for (String permissionExt : PERMISSION_FILE_EXT_ARR) {
            if (permissionExt.equals(upperExt)) {
                return true;
            }
        }
        throw new BusinessLogicException(BusinessExceptionCode.IMAGE_EXTENSION_NOT_VALID);
    }

    // 저장용 이미지 이름 생성
    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename); // 확장자
        String uuid = UUID.randomUUID().toString(); // 저장용 파일 이름
        return uuid + "." + ext;
    }

    // 이미지 확장자 추출
    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
