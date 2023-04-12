package com.teamdragon.dragonmoney.app.domain.popular.service;

import com.teamdragon.dragonmoney.app.domain.popular.repository.BestAwardsRepository;
import com.teamdragon.dragonmoney.app.domain.popular.entity.BestAwards;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@RequiredArgsConstructor
@Transactional
@Service
public class PopularHandleServiceImpl implements PopularHandleService {

    private final BestAwardsRepository bestAwardsRepository;

    public void saveBestAwardsList(ArrayList<BestAwards> bestAwards) {
        bestAwardsRepository.saveAll(bestAwards);
    }
}
