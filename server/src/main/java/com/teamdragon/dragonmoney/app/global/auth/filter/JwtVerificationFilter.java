package com.teamdragon.dragonmoney.app.global.auth.filter;

import com.teamdragon.dragonmoney.app.global.auth.dto.PrincipalDto;
import com.teamdragon.dragonmoney.app.global.auth.jwt.JwtTokenizer;
import com.teamdragon.dragonmoney.app.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;    //jwt를 검증하고 claims(토큰에 포함된 정보)를 얻는 데 사용
    private final CustomAuthorityUtils authorityUtils;  //CustomAuthorityUtils는 JWT 검증에 성공하면 Authentication 객체에 채울 사용자의 권한을 생성하는 데 사용

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //특정 예외 타입의 Exception이 catch 되면 해당 Exception을 HttpServletRequest의 애트리뷰트(Attribute)로 추가
        //예외가 발생하게 되면 SecurityContext에 클라이언트의 인증 정보(Authentication 객체)가 저장되지 않습니다.

        try {
            Map<String, Object> claims = verifyJws(request);    //JWT를 검증하는데 사용되는 private 메서드
            setAuthenticationToContext(claims); // Authentication 객체를 SecurityContext에 저장하기 위한 private 메서드
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        // JWT의 서명 검증에 성공하고, Security Context에 Authentication을 저장한 뒤에는
        // 다음(Next) Security Filter를 호출
        filterChain.doFilter(request, response);
    }

    //특정 조건에 부합하면(true이면) 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛰도록 해줍니다.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        //Authorization header의 값을 얻은 후에
        String authorization = request.getHeader("Authorization");

        //Authorization header의 값이 null이거나
        // Authorization header의 값이 “Bearer”로 시작하지 않는다면
        // 해당 Filter의 동작을 수행하지 않도록 정의
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        //request의 header에서 JWT를 얻고 있습니다.
        // JWT는 클라이언트가 response header로 전달받은 JWT를 request header에 추가해서 서버 측에 전송한 것
        //replace() 메서드를 이용해 “Bearer “부분을 제거
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        // JWT 서명(Signature)을 검증하기 위한 Secret Key를 얻습니다.
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //JWT에서 Claims를 파싱합니다.
        //Claims가 정상적으로 파싱이 되면 서명 검증 역시 자연스럽게 성공한 것
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        //JWT에서 파싱한 Claims에서 name을 얻습니다.
        String name = (String) claims.get("username");
        //JWT의 Claims에서 얻은 권한 정보를 기반으로 List<GrantedAuthority 를 생성합니다.
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        //username과 List<GrantedAuthority 를 포함한 Authentication 객체를 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(name, null, authorities);
        PrincipalDto principal = new PrincipalDto(name);

        //SecurityContext에 Authentication 객체를 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
