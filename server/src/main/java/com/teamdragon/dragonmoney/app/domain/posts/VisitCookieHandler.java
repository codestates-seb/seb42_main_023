package com.teamdragon.dragonmoney.app.domain.posts;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.lang.reflect.Type;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
public class VisitCookieHandler {
    private static final String VISIT_COOKIE_NAME = "visitList";
    private static final String COOKIE_PATH = "/posts";
    private final Gson gson = new Gson();
    private final Type type = new TypeToken<ArrayList<Long>>(){}.getType();

    // 게시글 조회 기록 확인
    public Boolean checkVisit(Cookie cookie, Long postsId) {
        if (cookie == null) {
            return false;
        }
        ArrayList<Long> list = getVisitList(cookie);
        return list.contains(postsId);
    }

    // 게시글 조회 쿠키 발급
    public Cookie generateCookie(Cookie cookie, Long postsId){
        ArrayList<Long> visitList;
        if (cookie != null) {
            visitList = getVisitList(cookie);
        } else {
            visitList = new ArrayList<>();
        }
        visitList.add(postsId);
        String cookieValueString = gson.toJson(visitList, type);

        Cookie newCookie = new Cookie(VISIT_COOKIE_NAME, cookieValueString);
        newCookie.setHttpOnly(true);
        newCookie.setSecure(true);
        newCookie.setPath(COOKIE_PATH);
        newCookie.setMaxAge(generateMaxAge().intValue());

        return newCookie;
    }

    // 방문 목록 획득
    private ArrayList<Long> getVisitList(Cookie cookie) {
        String cookieValue = cookie.getValue();
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
