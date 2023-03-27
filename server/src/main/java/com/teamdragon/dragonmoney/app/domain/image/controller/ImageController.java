package com.teamdragon.dragonmoney.app.domain.image.controller;

import com.teamdragon.dragonmoney.app.domain.image.dto.ImageDto;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.mapper.ImageMapper;
import com.teamdragon.dragonmoney.app.domain.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class ImageController {

    private final ImageService imageService;
    private final ImageMapper mapper;

//    @PostMapping("/image/new")
//    public ResponseEntity<ImageDto.ImageResponse> postImage(@RequestParam("image") MultipartFile file) {
//        Image saveImage = imageService.saveImage(file);
//        ImageDto.ImageResponse imageResponse = mapper.imageToImageResponse(saveImage);
//        return new ResponseEntity<>(imageResponse, HttpStatus.CREATED);
//        return null;
//    }
//
//    @PostMapping("/image/old")
//    public ResponseEntity<Map<String, String>> deleteImage(@RequestBody List<ImageDto.DeleteImage> imageDtoList) {
//
//        List<Image> images = mapper.deleteImageListDtoToImageList(imageDtoList);
//
//        String imageUrl = imageService.saveImage(file);
//        Map<String, String> response = new HashMap<>();
//        response.put("imageUrl", imageUrl);
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//        return null;
//    }
}
