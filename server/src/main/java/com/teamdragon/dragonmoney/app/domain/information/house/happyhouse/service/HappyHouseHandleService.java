package com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service;

import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.dto.HappyHouseApiDto;
import java.util.List;


public interface HappyHouseHandleService {

    void removeByOldDateTime();

    // 행복주택 정보 저장
    void saveHappyHouse(List<HappyHouseApiDto.NoticeElement> notices);

    // 지역 부동산 데이터 요청
    List<HappyHouseApiDto.HappyHousePackage> reqHappyHouseApi(int areaCode);

}
