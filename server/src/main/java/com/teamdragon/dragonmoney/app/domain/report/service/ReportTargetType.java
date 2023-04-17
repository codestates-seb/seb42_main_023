package com.teamdragon.dragonmoney.app.domain.report.service;

import lombok.Getter;

public enum ReportTargetType {
    POSTS("post", "게시물"),
    COMMENT("comment", "댓글"),
    REPLY("reply", "답글");

    @Getter
    private final String eng;

    @Getter
    private final String kor;

    ReportTargetType(String eng, String kor) {
        this.eng = eng;
        this.kor = kor;
    }
}
