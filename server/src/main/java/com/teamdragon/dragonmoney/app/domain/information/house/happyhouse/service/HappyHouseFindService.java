package com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service;

import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.entity.HappyHouse;
import org.springframework.data.domain.Page;

public interface HappyHouseFindService {

    Page<HappyHouse> findHappyHouseList(int page, HappyHouseAreaCode location, HappyHouseState state);

}
