package com.teamdragon.dragonmoney.app.domain.information.house.price.service;

import com.teamdragon.dragonmoney.app.domain.information.house.price.entity.HousePrice;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class HousePriceScheduled {

    private final HousePriceService housePriceService;

    // 1. 지역별 데이터 갱신 요청
    @Scheduled(cron = "0 0 5 * * TUE")
    public void collectHousePrices() {
        AreaCode[] areas = AreaCode.values();
        for (AreaCode area : areas) {
            Optional<HousePrice> optionalHousePrice = housePriceService.findByLocation(area);
            HousePrice housePrice = housePriceService.callFuncByHouseKind(area);
            if (optionalHousePrice.isPresent()) {
                HousePrice findHousePrice = optionalHousePrice.get();
                findHousePrice.updateData(housePrice);
                housePriceService.saveOrUpdateHousePrice(findHousePrice);
            } else {
                housePriceService.saveOrUpdateHousePrice(housePrice);
            }
        }
    }
}
