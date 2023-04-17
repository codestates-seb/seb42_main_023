package com.teamdragon.dragonmoney.app.domain.image.controller;

import com.teamdragon.dragonmoney.app.domain.image.dto.ImageDto;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.mapper.ImageMapper;
import com.teamdragon.dragonmoney.app.domain.image.service.ImageHandleService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@Validated
@RestController
public class ImageController {

    private final MemberFindService memberFindService;
    private final ImageHandleService imageHandleService;
    private final ImageMapper imageMapper;

    @PostMapping("/images")
    public ResponseEntity<ImageDto.ImageResponse> createImage(@AuthenticationPrincipal Principal principal,
                                                              @RequestParam("image") MultipartFile file) {
        Member loginMember = memberFindService.findVerifyMemberByName(principal.getName());

        Image saveImage = imageHandleService.createImage(loginMember, file);
        ImageDto.ImageResponse imageResponse = imageMapper.imageToImageResponse(saveImage);
        return new ResponseEntity<>(imageResponse, HttpStatus.CREATED);
    }

    @PostMapping("/images/drop")
    public ResponseEntity<Void> removeImage(@AuthenticationPrincipal Principal principal,
                                            @Valid @RequestBody ImageDto.DeleteImagesReq imagesDto) {
        Member loginMember = memberFindService.findVerifyMemberByName(principal.getName());
        List<Image> images = imageMapper.imageDtoListToImageList(imagesDto.getRemoveImages());
        imageHandleService.removeImageList(loginMember, images);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
