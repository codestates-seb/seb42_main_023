package com.teamdragon.dragonmoney.app.domain.information.information.house.price.repository;

import com.teamdragon.dragonmoney.app.domain.information.information.house.price.entity.HousePrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HousePriceRepository extends JpaRepository<HousePrice, Long> {
    Optional<HousePrice> findByLocation(String location);
}
