package com.teamdragon.dragonmoney.app.global.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginResponseDto {
    private String name;
    private String picture;
    private String role;

    @Builder
    public LoginResponseDto(String name, String picture, String role) {
        this.name = name;
        this.picture = picture;
        this.role = role;
    }
}
