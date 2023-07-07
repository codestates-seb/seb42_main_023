package com.teamdragon.dragonmoney.app.domain.information.house.price.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

public class SeoulApiDto {

    @Getter
    public static class HousePricePackage {
        @JsonProperty("tbLnOpendataRentV")
        private PriceApiPackage apiPackage;
    }

    @Getter
    public static class PriceApiPackage {
        @JsonProperty("list_total_count")
        private Long listTotalCount;
        @JsonProperty("RESULT")
        private PriceApiResult result;
        @JsonProperty("row")
        private List<PriceElement> row;
    }

    @Getter
    public static class PriceApiResult {
        @JsonProperty("CODE")
        private String code;
        @JsonProperty("MESSAGE")
        private String message;
    }

    @Getter
    public static class PriceElement {
        @JsonProperty("SGG_CD")
        private Integer areaCode;
        @JsonProperty("SGG_NM")
        private String areaName;
        @JsonProperty("RENT_GBN")
        private String rentType;
        @JsonProperty("RENT_AREA")
        private Double rentArea;
        @JsonProperty("RENT_GTN")
        private Long rentDeposit;
        @JsonProperty("RENT_FEE")
        private Long rentFee;
        @JsonProperty("HOUSE_GBN_NM")
        private String houseKind;
    }
}
