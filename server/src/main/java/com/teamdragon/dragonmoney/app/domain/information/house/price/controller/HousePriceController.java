package com.teamdragon.dragonmoney.app.domain.information.house.price.controller;

import com.teamdragon.dragonmoney.app.domain.information.house.price.dto.HousePriceDto;
import com.teamdragon.dragonmoney.app.domain.information.house.price.entity.HousePrice;
import com.teamdragon.dragonmoney.app.domain.information.house.price.service.HousePriceFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@Validated
@RestController
public class HousePriceController {

    private final HousePriceFindService housePriceFindService;

    // 부동산 정보 조회
    @GetMapping("/rent-price/house/seoul")
    public ResponseEntity<HousePriceDto.AllHousePriceRes> findHousePriceList() {
        List<HousePrice> allHousePrice = housePriceFindService.findAllHousePrice();
        HousePriceDto.AllHousePriceRes response = new HousePriceDto.AllHousePriceRes(allHousePrice);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
