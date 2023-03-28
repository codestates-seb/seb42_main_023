package com.teamdragon.dragonmoney.app.domain.information.house.price.dto;

import com.teamdragon.dragonmoney.app.domain.information.house.price.entity.HousePrice;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class HousePriceDto {
    @Getter
    public static class TempHousePrice {
        private int collectionSize;
        private Long totalMonthlyFee;
        private Double averageMonthlyFee;
        private Long totalDeposit;
        private Double averageDeposit;

        @Builder
        public TempHousePrice(int collectionSize, Long totalMonthlyFee, Long totalDeposit) {
            this.collectionSize = collectionSize;
            this.totalMonthlyFee = totalMonthlyFee;
            this.totalDeposit = totalDeposit;
            if (collectionSize == 0) {
                this.averageMonthlyFee = 0D;
                this.averageDeposit = 0D;
            } else {
                this.averageMonthlyFee = (double) (totalMonthlyFee / this.collectionSize);
                this.averageDeposit = (double) (totalDeposit / this.collectionSize);
            }
        }
    }

    @Getter
    public static class AllHousePriceRes {
        private LocalDateTime collectionTime;
        private List<LocationElement> locationList;

        public AllHousePriceRes(List<HousePrice> housePrices) {
            if (housePrices == null || housePrices.isEmpty()) {
                return;
            }
            this.collectionTime = housePrices.get(0).getCollectionTime();
            this.locationList = new ArrayList<>();
            for (HousePrice housePrice : housePrices) {
                this.locationList.add(new LocationElement(housePrice));
            }
        }
    }

    @Getter
    public static class LocationElement {
        private String location;
        private String happyHouse;
        private MonthlyRentElement monthlyRent;
        private JeonseElement jeonse;

        public LocationElement(HousePrice housePrice) {
            this.location = housePrice.getLocation();
            this.happyHouse = housePrice.getHappyHouseTitle();
            this.monthlyRent = MonthlyRentElement.builder()
                    .collectionSize(housePrice.getMonthlyRentCollectionSize())
                    .averageMonthlyFee(String.format("%.0f", housePrice.getMonthlyAverageMonthlyFee()) + "만원")
                    .averageDeposit(String.format("%.0f", housePrice.getMonthlyRentAverageDeposit()) + "만원")
                    .build();
            this.jeonse = JeonseElement.builder()
                    .collectionSize(housePrice.getJeonseRentCollectionSize())
                    .averageMonthlyFee(String.format("%.0f", housePrice.getJeonseAverageMonthlyFee()) + "만원")
                    .averageDeposit(String.format("%.0f", housePrice.getJeonseRentAverageDeposit()) + "만원")
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class MonthlyRentElement {
        private int collectionSize;
        private String averageDeposit;
        private String averageMonthlyFee;

        @Builder
        public MonthlyRentElement(int collectionSize, String averageDeposit, String averageMonthlyFee) {
            this.collectionSize = collectionSize;
            this.averageDeposit = averageDeposit;
            this.averageMonthlyFee = averageMonthlyFee;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class JeonseElement {
        private int collectionSize;
        private String averageDeposit;
        private String averageMonthlyFee;

        @Builder
        public JeonseElement(int collectionSize, String averageDeposit, String averageMonthlyFee) {
            this.collectionSize = collectionSize;
            this.averageDeposit = averageDeposit;
            this.averageMonthlyFee = averageMonthlyFee;
        }
    }
}
