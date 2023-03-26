package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service;

import lombok.Getter;

public enum HappyHouseAreaCode {

    SEOUL(11,"서울특별시", "seoul"),
    BUSAN(26,"부산광역시", "busan"),
    DAEGU(27,"대구광역시", "daegu"),
    GWANGJU(29,"광주광역시", "gwangju"),
    INCHEON(28,"인천광역시", "incheon"),
    DAEJEON(30,"대전광역시", "daejeon"),
    ULSAN(31,"울산광역시", "ulsan"),
    SEJONG(36110,"세종특별자치시", "sejong"),
    JEJU(50,"제주특별자치도", "jeju"),
    GANGWON_DO(42,"강원도", "gangwondo"),
    GYEONGGI_DO(41,"경기도", "gyeonggido"),
    CHUNGCHEONGNAM_DO(44,"충청남도", "chungcheongnamdo"),
    CHUNGCHEONGBUK_DO(43,"충청북도", "chungcheongbukdo"),
    JEOLLANAM_DO(46,"전라남도", "jeollanamdo"),
    JEOLLABUK_DO(45,"전라북도", "jeollabukdo"),
    GYEONGSANGNAM_DO(48,"경상남도", "gyengsangnamdo"),
    GYEONGSANGBUK_DO(47,"경상북도", "gyengsangbukdo");

    @Getter
    private int code;
    @Getter
    private String name;
    @Getter
    private String nameValue;

    HappyHouseAreaCode(int code, String name, String nameValue) {
        this.code = code;
        this.name = name;
        this.nameValue = nameValue;
    }
}
