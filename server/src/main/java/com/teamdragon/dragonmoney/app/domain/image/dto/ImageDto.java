package com.teamdragon.dragonmoney.app.domain.image.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

public class ImageDto {

    @Getter
    public static class DeleteImagesReq {
        private List<ImageReqDto> removeImages;
    }

    @Getter
    public static class ImageReqDto {
        @NotNull
        @Positive
        private Long imageId;
        @NotBlank
        private String imageName;
    }

    @Getter
    @AllArgsConstructor
    public static class ImageResponse {
        private Long imageId;
        private String imageName;
    }
}
