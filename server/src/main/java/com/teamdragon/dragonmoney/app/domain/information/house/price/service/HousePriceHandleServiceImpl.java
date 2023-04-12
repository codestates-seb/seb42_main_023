package com.teamdragon.dragonmoney.app.domain.information.house.price.service;

import com.teamdragon.dragonmoney.app.domain.information.house.price.dto.HousePriceDto;
import com.teamdragon.dragonmoney.app.domain.information.house.price.repository.HousePriceRepository;
import com.teamdragon.dragonmoney.app.domain.information.house.price.dto.SeoulApiDto;
import com.teamdragon.dragonmoney.app.domain.information.house.price.entity.HousePrice;
import com.teamdragon.dragonmoney.app.global.exception.ApiLogicException;
import com.teamdragon.dragonmoney.app.global.exception.ApiLogicExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Transactional
@Service
public class HousePriceHandleServiceImpl implements HousePriceHandleService{

    @Value("${api.seoul.key}")
    private String apiKey;
    @Value("${api.seoul.service}")
    private String serviceName;

    private final HousePriceRepository housePriceRepository;

    private static final String CONTENT_TYPE = "json";
    private static final int SEARCH_START_INDEX = 1;
    private static final int SEARCH_END_INDEX = 100;
    private static final String HOUSE_KIND_OFFICETELS = "오피스텔";
    private static final String HOUSE_KIND_TOWNHOUSE = "연립다세대";
    private static final String HOUSE_KIND_DETACHED_MULTI = "단독다가구";
    private static final String RENT_KIND_JEONSE = "전세";
    private static final String RENT_KIND_MONTHLY = "월세";

    // 저장 또는 업데이트
    public HousePrice saveOrUpdateHousePrice(HousePrice findHousePrice) {
        return housePriceRepository.save(findHousePrice);
    }

    // 2. 집 종류별 데이터 요청
    public HousePrice callFuncByHouseKind(AreaCode areaCode){
        // 집 종류별 요청
        Map<String, HousePriceDto.TempHousePrice> resultByOfficetels = getAverageByHouseKind(areaCode, HOUSE_KIND_OFFICETELS);
        Map<String, HousePriceDto.TempHousePrice> resultByTownhouse = getAverageByHouseKind(areaCode, HOUSE_KIND_TOWNHOUSE);
        Map<String, HousePriceDto.TempHousePrice> resultByDetached = getAverageByHouseKind(areaCode, HOUSE_KIND_DETACHED_MULTI);

        // 전세 월세 구분 집계
        HousePriceDto.TempHousePrice jeonseAverage
                = collectAveragePrice(
                        List.of(resultByOfficetels.get(RENT_KIND_JEONSE),
                                resultByTownhouse.get(RENT_KIND_JEONSE),
                                resultByDetached.get(RENT_KIND_JEONSE)));
        HousePriceDto.TempHousePrice monthlyAverage
                = collectAveragePrice(
                        List.of(resultByOfficetels.get(RENT_KIND_MONTHLY),
                                resultByTownhouse.get(RENT_KIND_MONTHLY),
                                resultByDetached.get(RENT_KIND_MONTHLY)));

        return HousePrice.builder()
                .location(areaCode.getName())
                .monthlyRentCollectionSize(monthlyAverage.getCollectionSize())
                .monthlyAverageMonthlyFee(monthlyAverage.getAverageMonthlyFee())
                .monthlyRentAverageDeposit(monthlyAverage.getAverageDeposit())
                .jeonseRentCollectionSize(jeonseAverage.getCollectionSize())
                .jeonseAverageMonthlyFee(jeonseAverage.getAverageMonthlyFee())
                .jeonseRentAverageDeposit(jeonseAverage.getAverageDeposit())
                .build();
    }

    // 3-1. 집 종류별 api 요청 및 평균 계산 요청
    private Map<String, HousePriceDto.TempHousePrice> getAverageByHouseKind(AreaCode areaCode, String houseKind) {
        SeoulApiDto.HousePricePackage dtoByOfficetels = reqHousePriceApi(areaCode.getCode(), houseKind);
        if (!dtoByOfficetels.getApiPackage().getResult().getCode().equals("INFO-000")) {
            log.error("HOUSE PRICE API CODE = {}", dtoByOfficetels.getApiPackage().getResult().getCode());
            throw new ApiLogicException(ApiLogicExceptionCode.HOUSE_PRICE_API_GET_FAIL);
        }
        Map<String, HousePriceDto.TempHousePrice> resultByOfficetels
                = calculateAverageByHouseKind(dtoByOfficetels.getApiPackage().getRow());
        return resultByOfficetels;
    }

    // 3-2. 집 종류별 계산 결과 집계
    private HousePriceDto.TempHousePrice collectAveragePrice(List<HousePriceDto.TempHousePrice> averages){
        return HousePriceDto.TempHousePrice.builder()
                .collectionSize(averages.stream().map(HousePriceDto.TempHousePrice::getCollectionSize).reduce(0, Integer::sum))
                .totalDeposit(averages.stream().map(HousePriceDto.TempHousePrice::getTotalDeposit).reduce(0L, Long::sum))
                .totalMonthlyFee(averages.stream().map(HousePriceDto.TempHousePrice::getTotalMonthlyFee).reduce(0L, Long::sum))
                .build();
    }

    // 4. 집 종류별 평균 계산
    private Map<String, HousePriceDto.TempHousePrice> calculateAverageByHouseKind(List<SeoulApiDto.PriceElement> row){
        int monthlyTotalCollectionSize = 0;
        Long monthlyTotalMonthlyFee = 0L;
        Long monthlyTotalDeposit = 0L;
        int jeonseTotalCollectionSize = 0;
        Long jeonseTotalMonthlyFee = 0L;
        Long jeonseTotalDeposit = 0L;
        Map<String, HousePriceDto.TempHousePrice> result = new HashMap<>();

        for (SeoulApiDto.PriceElement priceElement : row) {
            if (priceElement.getRentType().equals(RENT_KIND_JEONSE)) {
                jeonseTotalCollectionSize++;
                jeonseTotalMonthlyFee += priceElement.getRentFee();
                jeonseTotalDeposit += priceElement.getRentDeposit();
            } else {
                monthlyTotalCollectionSize++;
                monthlyTotalMonthlyFee += priceElement.getRentFee();
                monthlyTotalDeposit += priceElement.getRentDeposit();
            }
        }
        result.put(RENT_KIND_JEONSE, HousePriceDto.TempHousePrice.builder()
                .collectionSize(jeonseTotalCollectionSize)
                .totalMonthlyFee(jeonseTotalMonthlyFee)
                .totalDeposit(jeonseTotalDeposit)
                .build());
        result.put(RENT_KIND_MONTHLY, HousePriceDto.TempHousePrice.builder()
                .collectionSize(monthlyTotalCollectionSize)
                .totalMonthlyFee(monthlyTotalMonthlyFee)
                .totalDeposit(monthlyTotalDeposit)
                .build());
        return result;
    }

    // 지역 부동산 데이터 요청
    private SeoulApiDto.HousePricePackage reqHousePriceApi(int areaCode, String houseKind) {
        Mono<SeoulApiDto.HousePricePackage> objectMono = WebClient.builder()
                .baseUrl("http://openapi.seoul.go.kr:8088"
                + "/" + apiKey
                + "/" + CONTENT_TYPE
                + "/" + serviceName
                + "/" + SEARCH_START_INDEX
                + "/" + SEARCH_END_INDEX
                + "/" + " "
                + "/" + areaCode
                + "/ / / / / / / "
                + "/" + houseKind
                )
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build()
                .get()
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<SeoulApiDto.HousePricePackage>(){});
        return objectMono.block();
    }
}
