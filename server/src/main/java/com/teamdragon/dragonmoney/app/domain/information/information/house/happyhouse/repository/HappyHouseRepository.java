package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.repository;

import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity.HappyHouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface HappyHouseRepository extends JpaRepository<HappyHouse, Long>, HappyHouseRepositoryCustom {
    List<HappyHouse> findByNoticeIdIn(List<String> noticeIds);
    void deleteByNoticeEndDayBefore(LocalDateTime baseTime);
}
