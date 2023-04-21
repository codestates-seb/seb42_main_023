package com.teamdragon.dragonmoney.app.domain.popular.service;

import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

public interface PopularFindService {

    PostsDto.WeeklyPopularRes findWeeklyPopularListDto();

    List<Posts> findWeeklyPopularList();

    // 명예의 전당 목록 조회
    PostsDto.BestAwardsRes findBestAwardsList(int page, Posts.OrderBy orderBy);

    // 추천 게시물 목록 조회
    PostsDto.RecommendPostsListRes findRecommendPosts();

    // 주간인기글 측정 시작시간 설정
    void setStartTime();

    // 주간인기글 종료 시작시간 설정
    void setEndTime(LocalDateTime startTime);

    LocalDateTime getCountStartedAt();
}
