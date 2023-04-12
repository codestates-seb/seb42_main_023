package com.teamdragon.dragonmoney.app.domain.popular.controller;

import com.teamdragon.dragonmoney.app.domain.popular.service.PopularFindService;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@Validated
@RestController
public class PopularController {

    private final PopularFindService popularFindService;

    // 주간 인기 게시물 조회
    @GetMapping("/posts/weekly-popular")
    public ResponseEntity<PostsDto.WeeklyPopularRes> findWeeklyPopularList() {
        PostsDto.WeeklyPopularRes response = popularFindService.findWeeklyPopularListDto();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 명예의 전당 목록 조회
    @GetMapping("/posts/best-awards")
    public ResponseEntity<PostsDto.BestAwardsRes> findBestAwardsList(@Valid @Positive @RequestParam int page,
                                                                     @Valid @NotBlank @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        PostsDto.BestAwardsRes response = popularFindService.findBestAwardsList(page, orderBy);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 추천 게시물 목록 조회
    @GetMapping("/posts/recommend")
    public ResponseEntity<PostsDto.RecommendPostsListRes> findRecommendPostsList() {
        PostsDto.RecommendPostsListRes response = popularFindService.findRecommendPosts();
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
