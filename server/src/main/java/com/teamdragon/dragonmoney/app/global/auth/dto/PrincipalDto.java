package com.teamdragon.dragonmoney.app.global.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.List;

@Getter
@NoArgsConstructor
public class PrincipalDto implements Principal {
    String name;
    List<GrantedAuthority> roles;

    public PrincipalDto(String name, List<GrantedAuthority> roles) {
        this.name = name;
        this.roles = roles;
    }
}
