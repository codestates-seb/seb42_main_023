package com.teamdragon.dragonmoney.app.global.auth.handler;

import com.teamdragon.dragonmoney.app.global.auth.utils.ErrorResponder;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;

@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        if (exception instanceof SignatureException) {
            ErrorResponder.sendErrorResponseByExceptionCode(response, AuthExceptionCode.ACCESS_TOKEN_INVALID_01);
        } else if (exception instanceof ExpiredJwtException) {
            ErrorResponder.sendErrorResponseByExceptionCode(response, AuthExceptionCode.ACCESS_TOKEN_EXPIRED);
        } else {
            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
        }

        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
    }
}