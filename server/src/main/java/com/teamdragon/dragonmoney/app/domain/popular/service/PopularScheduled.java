package com.teamdragon.dragonmoney.app.domain.popular.service;

import com.teamdragon.dragonmoney.app.domain.popular.entity.BestAwards;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class PopularScheduled {

    private final PopularFindService popularFindService;
    private final PopularHandleService popularHandleService;

    // 명예의 전당 선정 : 매주 월요일 00시 수행
    @Scheduled(cron = "0 0 0 * * MON")
    public void decisionBestAwards() {
        List<Posts> weeklyPopularList = popularFindService.findWeeklyPopularList();
        ArrayList<BestAwards> bestAwards = new ArrayList<>();
        for (Posts posts : weeklyPopularList) {
            if (posts.getBestAwards() == null) {
                bestAwards.add(new BestAwards(posts));
            }
        }
        popularHandleService.saveBestAwardsList(bestAwards);

        popularFindService.setStartTime();
        popularFindService.setEndTime(popularFindService.getCountStartedAt());
    }
}
