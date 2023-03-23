package com.teamdragon.dragonmoney.app.domain.popular.controller;

import com.teamdragon.dragonmoney.app.domain.popular.service.PopularService;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class PopularController {

    private final PopularService popularService;

    // 주간 인기 게시물 조회
    @GetMapping("/posts/weekly-popular")
    public ResponseEntity<PostsDto.RecommendPostsListRes> findWeeklyPopularList() {
        List<Posts> weeklyPopularList = popularService.findWeeklyPopularList();
        PostsDto.RecommendPostsListRes response = new PostsDto.RecommendPostsListRes(weeklyPopularList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 명예의 전당 목록 조회
    @GetMapping("/posts/best-awards")
    public ResponseEntity<PostsDto.PostsListRes> findBestAwardsList(@Valid @Positive @RequestParam int page,
                                                @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        Page<Posts> bestAwardsList = popularService.findBestAwardsList(page, orderBy);
        PostsDto.PostsListRes response = new PostsDto.PostsListRes(bestAwardsList, orderby);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 추천 게시물 목록 조회
    @GetMapping("/posts/recommend")
    public ResponseEntity<PostsDto.WeeklyPopularRes> findRecommendPosts() {
        List<Posts> recommendPosts = popularService.findRecommendPosts();
        PostsDto.WeeklyPopularRes response = PostsDto.WeeklyPopularRes.builder()
                .posts(recommendPosts)
                .start(popularService.getCountStartedAt())
                .end(popularService.getCountEndedAt())
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // orderby 유효성검사 및 변환
    private Posts.OrderBy checkOrderBy(String orderby) {
        for (Posts.OrderBy postsOrderby : Posts.OrderBy.values()) {
            if (postsOrderby.getOrderBy().equals(orderby)) {
                return postsOrderby;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.ORDER_BY_NOT_VALID);
    }
}
