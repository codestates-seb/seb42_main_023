package com.teamdragon.dragonmoney.app.domain.image.dto;

import lombok.*;

public class ImageDto {
    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    public static class ImageResponse {
        private Long id;
        private String fileName;
    }
}
