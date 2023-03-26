package com.teamdragon.dragonmoney.app.domain.information.information.house.price.service;

import com.teamdragon.dragonmoney.app.domain.information.information.house.price.dto.HousePriceDto;
import com.teamdragon.dragonmoney.app.domain.information.information.house.price.dto.SeoulApiDto;
import com.teamdragon.dragonmoney.app.domain.information.information.house.price.entity.HousePrice;
import com.teamdragon.dragonmoney.app.domain.information.information.house.price.repository.HousePriceRepository;
import com.teamdragon.dragonmoney.app.global.exception.ApiLogicException;
import com.teamdragon.dragonmoney.app.global.exception.ApiLogicExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Transactional
@Service
public class HousePriceService {

    @Value("${api.seoul.key}")
    private String apiKey;
    @Value("${api.seoul.service}")
    private String serviceName;

    private final HousePriceRepository housePriceRepository;

    private final String CONTENT_TYPE = "json";
    private final int SEARCH_START_INDEX = 1;
    private final int SEARCH_END_INDEX = 100;
    private final String HOUSE_KIND_OFFICETELS = "오피스텔";
    private final String HOUSE_KIND_TOWNHOUSE = "연립다세대";
    private final String HOUSE_KIND_DETACHED_MULTI = "단독다가구";
    private final String RENT_KIND_JEONSE = "전세";
    private final String RENT_KIND_MONTHLY = "월세";

    @Getter
    private enum AreaCode {
        JUNGNANG_GU(11260,"중랑구"),
        NOWON_GU(11350,"노원구"),
        EUNPYEONG_GU(11380,"은평구"),
        SEODAEMUN_GU(11410,"서대문구"),
        MAPO_GU(11440,"마포구"),
        YANGCHEON_GU(11470,"양천구"),
        GANGSEO_GU(11500,"강서구"),
        GURO_GU(11530,"구로구"),
        GEUMCHEON_GU(11545,"금천구"),
        YEONGDEUNGPO_GU(11560,"영등포구"),
        DONGJAK_GU(11590,"동작구"),
        SONGPA_GU(11710,"송파구"),
        GANGDONG_GU(11740,"강동구"),
        JONGNO_GU(11110,"종로구"),
        JUNG_GU(11140,"중구"),
        YONGSAN_GU(11170,"용산구"),
        SEONGDONG_GU(11200,"성동구"),
        GWANGJIN_GU(11215,"광진구"),
        DONGDAEMUN_GU(11230,"동대문구"),
        SEONGBUK_GU(11290,"성북구"),
        GANGBUK_GU(11305,"강북구"),
        DOBONG_GU(11320,"도봉구"),
        GWANAK_GU(11620,"관악구"),
        SEOCHO_GU(11650,"서초구"),
        GANGNAM_GU(11680,"강남구");

        private int code;
        private String name;

        AreaCode(int code, String name) {
            this.code = code;
            this.name = name;
        }
    }

    // 저장된 지역별부동산정보 조회
    public List<HousePrice> findAllHousePrice() {
        return housePriceRepository.findAll();
    }

    // 지역별 데이터 갱신 요청
    @Scheduled(cron = "0 0 5 * * TUE")
    public void collectPriceByAreas() {
        AreaCode[] areas = AreaCode.values();
        for (AreaCode area : areas) {
            Optional<HousePrice> optionalHousePrice = housePriceRepository.findByLocation(area.getName());
            HousePrice housePrice = callFuncByHouseKind(area);
            if (optionalHousePrice.isPresent()) {
                HousePrice findHousePrice = optionalHousePrice.get();
                findHousePrice.updateData(housePrice);
                housePriceRepository.save(findHousePrice);
            } else {
                housePriceRepository.save(housePrice);
            }
        }
    }

    // 집 종류별 데이터 요청
    private HousePrice callFuncByHouseKind(AreaCode areaCode){
        Map<String, HousePriceDto.TempHousePrice> resultByOfficetels = getAverageByHouseKind(areaCode, HOUSE_KIND_OFFICETELS);
        Map<String, HousePriceDto.TempHousePrice> resultByTownhouse = getAverageByHouseKind(areaCode, HOUSE_KIND_TOWNHOUSE);
        Map<String, HousePriceDto.TempHousePrice> resultByDetached = getAverageByHouseKind(areaCode, HOUSE_KIND_DETACHED_MULTI);

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

    // 집 종류별 api 요청 및 평균 계산 요청
    private Map<String, HousePriceDto.TempHousePrice> getAverageByHouseKind(AreaCode areaCode, String houseKind) {
        SeoulApiDto.HousePricePackage dtoByOfficetels = reqHousePriceApi(areaCode.getCode(), houseKind);
        if (!dtoByOfficetels.getApiPackage().getResult().getCode().equals("INFO-000")) {
            log.error("HOUSE PRICE API CODE = {}", dtoByOfficetels.getApiPackage().getResult().getCode());
            throw new ApiLogicException(ApiLogicExceptionCode.HOUSE_PRICE_API_GET_FAIL);
        }
        Map<String, HousePriceDto.TempHousePrice> resultByOfficetels
                = calculateAverage(houseKind, dtoByOfficetels.getApiPackage().getRow());
        return resultByOfficetels;
    }

    // 집 종류별 계산 결과 집계
    private HousePriceDto.TempHousePrice collectAveragePrice(List<HousePriceDto.TempHousePrice> averages){
        return HousePriceDto.TempHousePrice.builder()
                .collectionSize(averages.stream().map(HousePriceDto.TempHousePrice::getCollectionSize).reduce(0, Integer::sum))
                .totalDeposit(averages.stream().map(HousePriceDto.TempHousePrice::getTotalDeposit).reduce(0L, Long::sum))
                .totalMonthlyFee(averages.stream().map(HousePriceDto.TempHousePrice::getTotalMonthlyFee).reduce(0L, Long::sum))
                .build();
    }

    // 집 종류별 평균 계산
    private Map<String, HousePriceDto.TempHousePrice> calculateAverage(String houseKind, List<SeoulApiDto.PriceElement> row){
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
