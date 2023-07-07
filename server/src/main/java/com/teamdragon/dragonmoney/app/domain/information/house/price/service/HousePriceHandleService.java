package com.teamdragon.dragonmoney.app.domain.information.house.price.service;

import com.teamdragon.dragonmoney.app.domain.information.house.price.entity.HousePrice;

public interface HousePriceHandleService {

    // 저장 또는 업데이트
    HousePrice saveOrUpdateHousePrice(HousePrice findHousePrice);

    // 집 종류별 데이터 요청
    HousePrice callFuncByHouseKind(AreaCode areaCode);
}
