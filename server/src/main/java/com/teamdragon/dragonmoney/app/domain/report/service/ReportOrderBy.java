package com.teamdragon.dragonmoney.app.domain.report.service;

import lombok.Getter;

public enum ReportOrderBy {
    ALL("all"),
    POST("post"),
    COMMENT("comment"),
    REPLY("reply");

    @Getter
    private final String orderBy;

    ReportOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }
}
