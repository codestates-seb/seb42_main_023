package com.teamdragon.dragonmoney.app.domain.image.service.platform;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    // 이미지 업로드
    public String uploadFile(MultipartFile multipartFile, String ext, String fullFileName){
        try {
            ObjectMetadata objectMetadata = getObjectMetadata(ext, multipartFile.getSize());
            // 업로드
            amazonS3.putObject(
                    // 업로드 구성
                    new PutObjectRequest(bucket, fullFileName, multipartFile.getInputStream(), objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead) // 퍼블릭 접근 권한 부여
            );
        } catch (AmazonServiceException e) {
            e.printStackTrace();
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_UPLOAD_FAIL);
        } catch (SdkClientException e) {
            e.printStackTrace();
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_UPLOAD_FAIL);
        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_UPLOAD_FAIL);
        }

        return amazonS3.getUrl(bucket, fullFileName).toString();
    }

    // 여러 객체 삭제
    public void removeFiles(List<String> storeFileNameKeys){
        String[] keys = storeFileNameKeys.toArray(new String[storeFileNameKeys.size()]);
        try {
            // key: 삭제를 원하는 객체의 경로를 포함한 이름
            amazonS3.deleteObjects(
                    new DeleteObjectsRequest(bucket)
                            .withKeys(keys)
            );
        } catch (AmazonServiceException e) {
            e.printStackTrace();
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_REMOVE_FAIL);
        } catch (SdkClientException e) {
            e.printStackTrace();
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_REMOVE_FAIL);
        }
    }

    // 단일 객체 삭제
    public void removeFile(String storeFileNameKey){
        try {
            // key: 삭제를 원하는 객체의 경로를 포함한 이름
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, storeFileNameKey));
        } catch (AmazonServiceException e) {
            e.printStackTrace();
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_REMOVE_FAIL);
        } catch (SdkClientException e) {
            e.printStackTrace();
            throw new BusinessLogicException(BusinessExceptionCode.IMAGE_REMOVE_FAIL);
        }
    }

    // 업로드 메타데이터 구성
    private ObjectMetadata getObjectMetadata(String ext, long fileSize) {
        ObjectMetadata metadata = new ObjectMetadata();
        String contentType = "";
        switch (ext) {
            case "jpg":
                contentType = "image/jpeg";
                break;
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "gif":
                contentType = "image/gif";
                break;
        }
        metadata.setContentType(contentType);
        metadata.setContentLength(fileSize);
        return metadata;
    }
}
