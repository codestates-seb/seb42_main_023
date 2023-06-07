package com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.service;

import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.dto.HappyHouseApiDto;
import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.entity.HappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.house.happyhouse.repository.HappyHouseRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class HappyHouseHandleServiceImpl implements HappyHouseHandleService {

    @Value("${api.public-data.secret}")
    private String secretKey;

    private final HappyHouseRepository happyHouseRepository;

    private static final String RENT_HOUSE_CODE = "06";
    private static final int API_PAGE_ELEMENT_SIZE = 10;
    private static final int API_PAGE_NUM = 1;

    // 오래된 공고 데이터 삭제
    @Override
    public void removeByOldDateTime() {
        LocalDateTime twoMonthAgo = LocalDateTime.now().minusMonths(2);
        happyHouseRepository.deleteByNoticeEndDayBefore(twoMonthAgo);
    }

    // 행복주택 정보 저장
    @Override
    public void saveHappyHouse(List<HappyHouseApiDto.NoticeElement> notices) {
        // 응답받은 공고
        List<HappyHouse> newHappyHouses = getHappyHouseList(notices);
        // DB 조회 : 기존 공고
        List<String> noticeIds = newHappyHouses.stream()
                .map(HappyHouse::getNoticeId)
                .collect(Collectors.toList());
        List<HappyHouse> findHappyHouses = happyHouseRepository.findByNoticeIdIn(noticeIds);
        // 저장 또는 업데이트
        saveOrUpdate(newHappyHouses, findHappyHouses);
    }

    // 데이터 수정 또는 추가
    public void saveOrUpdate(List<HappyHouse> newHappyHouses, List<HappyHouse> findHappyHouses) {
        // 추가(업데이트)할 공고 목록
        Map<String, HappyHouse> addHappyHouseMap = new HashMap<>();
        // 기존 공고
        Map<String, HappyHouse> findHappyHouseMap
                = findHappyHouses.stream().collect(Collectors.toMap(HappyHouse::getNoticeId, fh -> fh));

        for (HappyHouse newHappyHouse : newHappyHouses) {
            // notice Id 로 기존 공고 조회
            HappyHouse findHouse = findHappyHouseMap.get(newHappyHouse.getNoticeId());
            if (findHouse != null ) {
                findHouse.updateData(newHappyHouse);
                addHappyHouseMap.put(findHouse.getNoticeId(), findHouse);
            } else {
                if (!addHappyHouseMap.containsKey(newHappyHouse.getNoticeId())) {
                    addHappyHouseMap.put(newHappyHouse.getNoticeId(), newHappyHouse);
                }
            }
        }
        List<HappyHouse> addHappyHouse
                = new ArrayList<>(addHappyHouseMap.values());
        happyHouseRepository.saveAll(addHappyHouse);
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

    // 지역 부동산 데이터 요청
    @Override
    public List<HappyHouseApiDto.HappyHousePackage> reqHappyHouseApi(int areaCode) {

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
}
