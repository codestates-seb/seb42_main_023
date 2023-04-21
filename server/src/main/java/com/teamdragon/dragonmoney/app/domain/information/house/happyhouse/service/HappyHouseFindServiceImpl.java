package com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service;

import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.entity.HappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.repository.HappyHouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class HappyHouseFindServiceImpl implements HappyHouseFindService{

    private final HappyHouseRepository happyHouseRepository;
    private static final int PAGE_ELEMENT_SIZE = 5;

    // 행복주택 목록 조회 : 요청페이지번호, 필터링기준
    public Page<HappyHouse> findHappyHouseList(int page, HappyHouseAreaCode location, HappyHouseState state){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by("noticeEndDay").descending());
        if (state == HappyHouseState.ALL) {
            return happyHouseRepository.findHappyHouseListByPageAllState(pageable, location);
        } else {
            return happyHouseRepository.findHappyHouseListByPage(pageable, location, state);
        }
    }
}
