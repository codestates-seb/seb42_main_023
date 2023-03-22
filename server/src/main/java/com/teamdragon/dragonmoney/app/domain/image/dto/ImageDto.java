package com.teamdragon.dragonmoney.app.domain.image.dto;

import lombok.*;

public class ImageDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class ImageResponse {
        private Long imageId;
        private String imageName;
    }
}
