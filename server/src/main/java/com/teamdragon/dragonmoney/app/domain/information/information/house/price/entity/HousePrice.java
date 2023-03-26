package com.teamdragon.dragonmoney.app.domain.information.information.house.price.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class HousePrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String location;

    @Column
    private LocalDateTime collectionTime;

    @Column
    private String happyHouseTitle;

    @Column
    private int monthlyRentCollectionSize;

    @Column
    private Double monthlyRentAverageDeposit;

    @Column
    private Double monthlyAverageMonthlyFee;

    @Column
    private int jeonseRentCollectionSize;

    @Column
    private Double jeonseRentAverageDeposit;

    @Column
    private Double jeonseAverageMonthlyFee;

    @Builder
    public HousePrice(String location, String happyHouseTitle, int monthlyRentCollectionSize, Double monthlyRentAverageDeposit, Double monthlyAverageMonthlyFee, int jeonseRentCollectionSize, Double jeonseRentAverageDeposit, Double jeonseAverageMonthlyFee) {
        this.collectionTime = LocalDateTime.now();
        this.location = location;
        this.happyHouseTitle = happyHouseTitle;
        this.monthlyRentCollectionSize = monthlyRentCollectionSize;
        this.monthlyRentAverageDeposit = monthlyRentAverageDeposit;
        this.monthlyAverageMonthlyFee = monthlyAverageMonthlyFee;
        this.jeonseRentCollectionSize = jeonseRentCollectionSize;
        this.jeonseRentAverageDeposit = jeonseRentAverageDeposit;
        this.jeonseAverageMonthlyFee = jeonseAverageMonthlyFee;
    }

    public void isUpdatedNow() {
        this.collectionTime = LocalDateTime.now();
    }

    public void updateData(HousePrice housePrice) {
        this.collectionTime = housePrice.getCollectionTime();
        this.monthlyRentCollectionSize = housePrice.getMonthlyRentCollectionSize();
        this.monthlyRentAverageDeposit = housePrice.getMonthlyRentAverageDeposit();
        this.monthlyAverageMonthlyFee = housePrice.getMonthlyAverageMonthlyFee();
        this.jeonseRentCollectionSize = housePrice.getJeonseRentCollectionSize();
        this.jeonseRentAverageDeposit = housePrice.getJeonseRentAverageDeposit();
        this.jeonseAverageMonthlyFee = housePrice.getJeonseAverageMonthlyFee();
    }
}
