package com.teamdragon.dragonmoney.app.domain.image.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.repository.ImageRepository;
import com.teamdragon.dragonmoney.app.domain.image.service.platform.CloudService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class ImageHandleServiceImpl implements ImageHandleService{

    // 이미지 최대 크기 : 2MB : 2,000,000
    @Value("${file.upload-max-size}")
    private Integer FILE_MAX_SIZE;

    // 허용 이미지 확장자
    private static final String[] PERMISSION_FILE_EXT_ARR = {"GIF", "JPEG", "JPG", "PNG"};

    private final CloudService cloudService;
    private final ImageRepository imageRepository;

    // 이미지 업로드
    @Override
    public Image createImage(Member loginMember, MultipartFile multipartFile) {
        // 파일 크기 검사
        checkFileSize(multipartFile);
        // 확장자 검사
        String ext = isVerifyExt(multipartFile);

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName(originalFilename);

        // 클라우드 업로드
        String url = uploadImageToCloud(multipartFile, ext, storeFileName);
        // DB 업로드
        return createImageToDB(loginMember, url, ext, storeFileName);
    }

    // 이미지들 삭제
    @Override
    public void removeImageList(Member loginMember, List<Image> removeImages) {
        if (removeImages == null || removeImages.isEmpty()) {
            return;
        }
        List<Long> imageIds = removeImages.stream().map(Image::getId).collect(Collectors.toList());
        List<Image> findImages = imageRepository.findAllByIdsAndMemberId(imageIds, loginMember.getId());
        if (findImages.isEmpty()) {
            return;
        }
        // DB 삭제
        removeImageListFromDB(findImages);
        // 클라우드 복수 이미지 삭제
        removeImageListFromCloud(findImages);
    }

    // 복수 이미지 삭제 : DB
    @Override
    public void removeImageListFromDB(List<Image> removeImages) {
        List<Long> imageIds = removeImages.stream()
                .map(Image::getId)
                .collect(Collectors.toList());
        imageRepository.deleteImagesByIds(imageIds);
    }

    // 복수 이미지 삭제 : 클라우드
    @Override
    public void removeImageListFromCloud(List<Image> removeImages) {
        List<String> deleteFileNames = removeImages.stream()
                .map(Image::getFileName)
                .collect(Collectors.toList());
        cloudService.removeFileList(deleteFileNames);
    }

    // 이미지 업로드 : 클라우드
    private String uploadImageToCloud(MultipartFile multipartFile, String ext, String storeFileName)  {
        String url = cloudService.uploadFile(multipartFile, ext, storeFileName);
        return url;
    }

    // 이미지 저장 : DB
    private Image createImageToDB(Member loginMember, String url, String ext, String storeFileName) {
        Image image = Image.builder()
                .url(url)
                .uploader(loginMember)
                .fileName(storeFileName)
                .extension(ext)
                .state(Image.State.WRITING)
                .build();
        return imageRepository.save(image);
    }

    // 이미지 크기 확인
    @Override
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
    private String isVerifyExt(MultipartFile multipartFile ) {
        String ext = extractExt(multipartFile.getOriginalFilename());
        String upperExt = ext.toUpperCase();

        for (String permissionExt : PERMISSION_FILE_EXT_ARR) {
            if (permissionExt.equals(upperExt)) {
                return ext.toLowerCase();
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
