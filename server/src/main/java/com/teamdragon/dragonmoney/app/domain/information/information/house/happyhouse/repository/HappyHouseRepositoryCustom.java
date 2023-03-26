package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.repository;

import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity.HappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service.HappyHouseAreaCode;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service.HappyHouseState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HappyHouseRepositoryCustom {
    Page<HappyHouse> findHappyHouseListByPage(Pageable pageable, HappyHouseAreaCode location, HappyHouseState state);
    Page<HappyHouse> findHappyHouseListByPageAllState(Pageable pageable, HappyHouseAreaCode location);
}
