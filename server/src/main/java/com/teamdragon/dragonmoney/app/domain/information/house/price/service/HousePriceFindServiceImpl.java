package com.teamdragon.dragonmoney.app.domain.information.house.price.service;

import com.teamdragon.dragonmoney.app.domain.information.house.price.entity.HousePrice;
import com.teamdragon.dragonmoney.app.domain.information.house.price.repository.HousePriceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class HousePriceFindServiceImpl implements HousePriceFindService {

    private final HousePriceRepository housePriceRepository;

    // 저장된 지역별부동산정보 조회
    public List<HousePrice> findAllHousePrice() {
        return housePriceRepository.findAll();
    }

    // 단일 조회 : 지역
    public Optional<HousePrice> findByLocation(AreaCode area) {
        return housePriceRepository.findByLocation(area.getName());
    }
}
