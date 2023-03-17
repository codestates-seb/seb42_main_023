package com.teamdragon.dragonmoney.app.global.auth.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class TempAccessTokenDto {
    @NotNull
    private String TempAccessToken;
}