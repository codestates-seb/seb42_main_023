package com.teamdragon.dragonmoney.app.domain.popular.service;

import com.teamdragon.dragonmoney.app.domain.popular.entity.BestAwards;

import java.util.ArrayList;

public interface PopularHandleService {

    void saveBestAwardsList(ArrayList<BestAwards> bestAwards);

}
