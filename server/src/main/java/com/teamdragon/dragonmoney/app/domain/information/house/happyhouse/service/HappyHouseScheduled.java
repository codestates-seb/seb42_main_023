package com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service;

import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.dto.HappyHouseApiDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class HappyHouseScheduled {

    private final HappyHouseHandleService happyHouseHandleService;

    // 지역별 데이터 요청
    @Scheduled(cron = "0 0 4 * * *")
    public void collectHappyHouseList(){
        HappyHouseAreaCode[] areas = HappyHouseAreaCode.values();
        for (HappyHouseAreaCode area : areas) {
            HappyHouseApiDto.HappyHousePackage happyHousePackage
                    = happyHouseHandleService.reqHappyHouseApi(area.getCode()).get(1);
            List<HappyHouseApiDto.NoticeElement> dsList = happyHousePackage.getDsList();
            happyHouseHandleService.saveHappyHouse(dsList);
        }
        happyHouseHandleService.removeByOldDateTime();
    }
}
