package com.teamdragon.dragonmoney.app.domain.image.dto;

import lombok.Getter;
import lombok.Setter;

public class ImageDto {

    @Getter
    @Setter
    public static class DeleteImage {
        private Long id;
        private String fileName;
    }

    @Getter
    @Setter
    public static class ImageResponse {
        private Long id;
        private String fileName;
    }
}
