package com.teamdragon.dragonmoney.app.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TempAccessTokenDto {
    @NotNull
    private String tempAccessToken;
}