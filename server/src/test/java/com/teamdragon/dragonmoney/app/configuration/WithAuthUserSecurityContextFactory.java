package com.teamdragon.dragonmoney.app.configuration;

import com.teamdragon.dragonmoney.app.global.auth.dto.PrincipalDto;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.List;

// 테스트에서 시큐리티 인증을 위한 커스텀 애노테이션을 위한 구현 클래스
public class WithAuthUserSecurityContextFactory implements WithSecurityContextFactory<WithAuthUser> {

    @Override
    public SecurityContext createSecurityContext(WithAuthUser annotation) {
        String name = annotation.name();
        String email = annotation.email();

        CustomAuthorityUtils authorityUtils = new CustomAuthorityUtils();
        List<String> roles = authorityUtils.createRoles(email);

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(roles);

        PrincipalDto principal = new PrincipalDto(name, authorities);

        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null, authorities);
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);
        return context;
    }
}
