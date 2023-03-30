package com.teamdragon.dragonmoney.app.global.auth.config;

import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.global.auth.filter.JwtVerificationFilter;
import com.teamdragon.dragonmoney.app.global.auth.handler.MemberAccessDeniedHandler;
import com.teamdragon.dragonmoney.app.global.auth.handler.MemberAuthenticationEntryPoint;
import com.teamdragon.dragonmoney.app.global.auth.handler.OAuth2MemberHandler;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.service.OAuth2Service;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final OAuth2Service oAuth2Service;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/members/*").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members/*").permitAll()
                        .antMatchers(HttpMethod.GET, "/members/*/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/auth/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/*/bookmark/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members/*/bookmark/**").hasRole("USER")

                        .antMatchers(HttpMethod.POST, "/images").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/images/drop").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/posts").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/posts/*").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/posts").permitAll()
                        .antMatchers(HttpMethod.GET, "/posts/*").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/posts/*").hasRole("USER")

                        .antMatchers(HttpMethod.POST, "/posts/*/comments").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/posts/*/comments").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/comments/*").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/comments/*").hasRole("USER")

                        .antMatchers(HttpMethod.POST, "/comments/*/replies").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/replies/*").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/replies/*").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/comments/*/replies").permitAll()

                        .antMatchers(HttpMethod.POST, "/posts/*/thumbup").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/comments/*/thumbup").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/replies/*/thumbup").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/posts/*/thumbup").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/comments/*/thumbup").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/replies/*/thumbup").hasRole("USER")

                        .antMatchers(HttpMethod.POST, "/posts/*/thumbdown").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/comments/*/thumbdown").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/replies/*/thumbdown").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/posts/*/thumbdown").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/comments/*/thumbdown").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/replies/*/thumbdown").hasRole("USER")

                        .antMatchers(HttpMethod.POST, "/reports").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/reports/*").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/reports/*").hasRole("ADMIN")

                        .antMatchers(HttpMethod.GET, "/recruit/happy-house").permitAll()
                        .antMatchers(HttpMethod.GET, "/rent-price/house/seoul").permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberHandler(jwtTokenizer, authorityUtils, memberService, oAuth2Service))
                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedOriginPattern("http://hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addExposedHeader("Access-Control-Allow-Credentials");
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}