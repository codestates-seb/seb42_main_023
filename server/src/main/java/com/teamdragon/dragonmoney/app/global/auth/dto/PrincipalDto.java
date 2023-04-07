package com.teamdragon.dragonmoney.app.global.auth.dto;

import lombok.Getter;

import java.security.Principal;

@Getter
public class PrincipalDto implements Principal {
    String name;

    public PrincipalDto(String name) {
        this.name = name;
    }
}
