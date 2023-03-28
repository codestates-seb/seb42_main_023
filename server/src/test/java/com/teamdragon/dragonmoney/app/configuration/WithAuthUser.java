package com.teamdragon.dragonmoney.app.configuration;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

// 테스트에서 시큐리티 인증을 위한 커스텀 애노테이션
@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithAuthUserSecurityContextFactory.class)
public @interface WithAuthUser {
    String name();
    String email();
}
