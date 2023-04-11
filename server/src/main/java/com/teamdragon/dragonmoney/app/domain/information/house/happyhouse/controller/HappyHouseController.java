package com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.controller;

import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.dto.HappyHouseDto;
import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.entity.HappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service.HappyHouseAreaCode;
import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service.HappyHouseService;
import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service.HappyHouseState;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@Validated
@RestController
public class HappyHouseController {

    private final HappyHouseService happyHouseService;

    // 목록 조회
    @GetMapping("/recruit/happy-house")
    public ResponseEntity<HappyHouseDto.HappyHouseListRes> findHappyHouseList(@Valid @Positive @RequestParam int page,
                                                                              @Valid @NotBlank @RequestParam String location,
                                                                              @Valid @NotBlank @RequestParam String state) {
        HappyHouseAreaCode locationEnum = checkLocation(location);
        HappyHouseState stateEnum = checkState(state);
        Page<HappyHouse> happyHouseList = happyHouseService.findHappyHouseList(page, locationEnum, stateEnum);
        HappyHouseDto.HappyHouseListRes response =
                new HappyHouseDto.HappyHouseListRes(happyHouseList, locationEnum.getName(), stateEnum.getStateName());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // location 유효성 검사 및 반환
    private HappyHouseAreaCode checkLocation(String location) {
        for (HappyHouseAreaCode area :HappyHouseAreaCode.values()) {
            if (area.getNameValue().equals(location)) {
                return area;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.INVALID_LOCATION);
    }

    // state 유효성 검사 및 반환
    private HappyHouseState checkState(String state) {
        for (HappyHouseState houseState :HappyHouseState.values()) {
            if (houseState.getStateValue().equals(state)) {
                return houseState;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.INVALID_STATE);
    }
}
