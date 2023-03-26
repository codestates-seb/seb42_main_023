package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service;

import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.dto.HappyHouseApiDto;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity.HappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.repository.HappyHouseRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class HappyHouseService {

    @Value("${api.public-data.secret}")
    private String secretKey;

    private final HappyHouseRepository happyHouseRepository;

    private final String RENT_HOUSE_CODE = "06";
    private final int API_PAGE_ELEMENT_SIZE = 10;
    private final int API_PAGE_NUM = 1;
    private final int PAGE_ELEMENT_SIZE = 5;

    // 행복주택 목록 조회 : 요청페이지번호, 필터링기준
    public Page<HappyHouse> findHappyHouseList(int page, HappyHouseAreaCode location, HappyHouseState state){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by("inquiryDate").descending());
        if (state == HappyHouseState.ALL) {
            return happyHouseRepository.findHappyHouseListByPageAllState(pageable, location);
        } else {
            return happyHouseRepository.findHappyHouseListByPage(pageable, location, state);
        }
    }

    // 지역별 데이터 요청
    @Scheduled(cron = "0 0 4 * * *")
    public void findHappyHouseByAreas(){
        HappyHouseAreaCode[] areas = HappyHouseAreaCode.values();
        for (HappyHouseAreaCode area : areas) {
            HappyHouseApiDto.HappyHousePackage happyHousePackage
                    = reqHappyHouseApi(area.getCode()).get(1);
            List<HappyHouseApiDto.NoticeElement> dsList = happyHousePackage.getDsList();
            saveHappyHouse(dsList);
        }
        removeByDateTime();
    }

    // 오래된 공고 데이터 삭제
    private void removeByDateTime() {
        LocalDateTime twoMonthAgo = LocalDateTime.now().minusMonths(2);
        happyHouseRepository.deleteByNoticeEndDayBefore(twoMonthAgo);
    }

    // 데이터 조회
    private void saveHappyHouse(List<HappyHouseApiDto.NoticeElement> notices) {
        List<HappyHouse> newHappyHouses = getHappyHouseList(notices);
        // DB 조회
        List<String> noticeIds = newHappyHouses.stream()
                .map(HappyHouse::getNoticeId)
                .collect(Collectors.toList());
        List<HappyHouse> findHappyHouses = happyHouseRepository.findByNoticeIdIn(noticeIds);

        saveOrUpdate(newHappyHouses, findHappyHouses);
    }

    // 데이터 수정, 추가
    private void saveOrUpdate(List<HappyHouse> newHappyHouses, List<HappyHouse> findHappyHouses) {
        Map<String, HappyHouse> findHappyHouseMap
                = findHappyHouses.stream().collect(Collectors.toMap(fh -> fh.getNoticeId(), fh -> fh));
        ArrayList<HappyHouse> addHappyHouse = new ArrayList<>();
        for (HappyHouse newHappyHouse : newHappyHouses) {
            HappyHouse findHouse = findHappyHouseMap.get(newHappyHouse.getNoticeId());
            if (findHouse != null ) {
                findHouse.updateData(newHappyHouse);
                addHappyHouse.add(findHouse);
            } else {
                addHappyHouse.add(newHappyHouse);
            }
        }
        happyHouseRepository.saveAll(addHappyHouse);
    }

    // 지역 부동산 데이터 요청
    private List<HappyHouseApiDto.HappyHousePackage> reqHappyHouseApi(int areaCode) {

        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory("http://apis.data.go.kr");
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        Mono<List<HappyHouseApiDto.HappyHousePackage>> objectMono = WebClient.builder()
                .uriBuilderFactory(factory)
                .baseUrl("http://apis.data.go.kr")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build()
                .get()
                .uri(uriBuilder -> uriBuilder.path("/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1")
                        .queryParam("serviceKey", secretKey)
                        .queryParam("PG_SZ", API_PAGE_ELEMENT_SIZE)
                        .queryParam("PAGE", API_PAGE_NUM)
                        .queryParam("UPP_AIS_TP_CD", RENT_HOUSE_CODE)
                        .queryParam("CNP_CD", areaCode)
                        .build()
                )
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<HappyHouseApiDto.HappyHousePackage>>(){});
        return objectMono.block();
    }

    private List<HappyHouse> getHappyHouseList(List<HappyHouseApiDto.NoticeElement> notices) {
        return notices.stream().map(n -> {
            return HappyHouse.builder()
                    .noticeId(n.getNoticeId())
                    .noticeKind(n.getNoticeKind())
                    .noticeDetailKind(n.getNoticeDetailKind())
                    .noticeTitle(n.getNoticeTitle())
                    .location(n.getLocation())
                    .noticeState(n.getNoticeState())
                    .noticeStartDay(n.getNoticeStartDay())
                    .noticeEndDay(n.getNoticeEndDay())
                    .recruitDay(n.getRecruitDay())
                    .noticeUrl(n.getNoticeUrl())
                    .build();
        }).collect(Collectors.toList());
    }
}
