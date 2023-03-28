package com.teamdragon.dragonmoney.app.global.auth.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class LoginResponseDto {
    private String name;
    private String picture;
    private String role;
}
