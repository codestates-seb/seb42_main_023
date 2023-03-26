package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service;

import lombok.Getter;

public enum HappyHouseState {
    CLOSE("접수마감", "close"),
    OPEN("공고중", "open"),
    MODIFIED("정정공고중", "modified"),
    ALL("전체", "all");

    @Getter
    private String stateName;
    @Getter
    private String stateValue;

    HappyHouseState(String stateName, String stateValue) {
        this.stateName = stateName;
        this.stateValue = stateValue;
    }
}
