package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class HappyHouseApiDto {

    @Getter
    public static class HappyHousePackage {
        @JsonProperty("dsList")
        List<NoticeElement> dsList;
    }

    @Getter
    public static class NoticeElement {

        // 전체 조회 건수
        @JsonProperty("ALL_CNT")
        private String totalCount;

        // 공고 유형
        @JsonProperty("UPP_AIS_TP_NM")
        private String noticeKind;

        // 공고 세부 유형
        @JsonProperty("AIS_TP_CD_NM")
        private String noticeDetailKind;

        // 공고 제목
        @JsonProperty("PAN_NM")
        private String noticeTitle;

        // 지역 이름
        @JsonProperty("CNP_CD_NM")
        private String location;

        // 공고 게시일
        @JsonProperty("PAN_NT_ST_DT")
        private String noticeStartDay;

        // 공고 마감일
        @JsonProperty("CLSG_DT")
        private String noticeEndDay;

        // 공고 상태
        @JsonProperty("PAN_SS")
        private String noticeState;

        // 공고 URL
        @JsonProperty("DTL_URL")
        private String noticeUrl;

        // 공고 ID
        @JsonProperty("PAN_ID")
        private String noticeId;

        // 공고 모집일
        @JsonProperty("PAN_DT")
        private String recruitDay;
    }
}
