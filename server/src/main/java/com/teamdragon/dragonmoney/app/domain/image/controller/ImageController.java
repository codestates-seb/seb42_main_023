package com.teamdragon.dragonmoney.app.domain.image.controller;

import com.teamdragon.dragonmoney.app.domain.common.service.FinderService;
import com.teamdragon.dragonmoney.app.domain.image.dto.ImageDto;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.mapper.ImageMapper;
import com.teamdragon.dragonmoney.app.domain.image.service.ImageService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class ImageController {

    private final FinderService finderService;
    private final ImageService imageService;
    private final ImageMapper imageMapper;

    @PostMapping("/images")
    public ResponseEntity<ImageDto.ImageResponse> createImage(@AuthenticationPrincipal Principal principal,
                                                              @RequestParam("image") MultipartFile file) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());

        Image saveImage = imageService.saveImage(loginMember, file);
        ImageDto.ImageResponse imageResponse = imageMapper.imageToImageResponse(saveImage);
        return new ResponseEntity<>(imageResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/images")
    public ResponseEntity<Void> deleteImage(@AuthenticationPrincipal Principal principal,
                                            @Valid @RequestBody ImageDto.DeleteImagesReq imagesDto) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        List<Image> images = imageMapper.imageDtoListToImageList(imagesDto.getRemoveImages());
        imageService.removeImages(loginMember, images);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
