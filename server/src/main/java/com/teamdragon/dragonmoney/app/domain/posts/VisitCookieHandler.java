package com.teamdragon.dragonmoney.app.domain.posts;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.lang.reflect.Type;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashSet;

@Slf4j
@Component
public class VisitCookieHandler {
    private static final String SERVER_DOMAIN = "thedragonmoney.com";
    private static final String VISIT_COOKIE_NAME = "VISIT_LIST";
    private static final String COOKIE_PATH = "/posts";
    private final Gson gson = new Gson();
    private final Type type = new TypeToken<HashSet<Long>>(){}.getType();

    // 게시글 조회 기록 확인
    public Boolean checkVisit(Cookie cookie, Long postsId) {
        if (cookie == null) {
            return false;
        }
        HashSet<Long> list = getVisitList(cookie);
        return list.contains(postsId);
    }

    // 게시글 조회 쿠키 발급
    public ResponseCookie generateCookie(Cookie cookie, Long postsId){
        HashSet<Long> visitList;
        if (cookie != null) {
            visitList = getVisitList(cookie);
        } else {
            visitList = new HashSet<>();
        }
        visitList.add(postsId);
        String cookieValueString = gson.toJson(visitList, type);
        cookieValueString = cookieValueString.replace(",", "_");

        return ResponseCookie.from(VISIT_COOKIE_NAME, cookieValueString)
                .domain(SERVER_DOMAIN)
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .path(COOKIE_PATH)
                .maxAge(generateMaxAge().intValue())
                .build();
    }

    // 방문 목록 획득
    private HashSet<Long> getVisitList(Cookie cookie) {
        String cookieValue = cookie.getValue();
        cookieValue = cookieValue.replace("_", ",");
        return gson.fromJson(cookieValue, type);
    }

    // 쿠키 수명 계산
    private Long generateMaxAge() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nextDay = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 0, 0);
        nextDay = nextDay.plusDays(1);
        return Duration.between(nextDay, now).getSeconds();
    }
}
