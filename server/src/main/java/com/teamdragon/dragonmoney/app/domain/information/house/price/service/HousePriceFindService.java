package com.teamdragon.dragonmoney.app.domain.information.house.price.service;

import com.teamdragon.dragonmoney.app.domain.information.house.price.entity.HousePrice;

import java.util.List;
import java.util.Optional;

public interface HousePriceFindService {

    // 저장된 지역별부동산정보 조회
    List<HousePrice> findAllHousePrice();

    // 단일 조회 : 지역
    Optional<HousePrice> findByLocation(AreaCode area);
}
