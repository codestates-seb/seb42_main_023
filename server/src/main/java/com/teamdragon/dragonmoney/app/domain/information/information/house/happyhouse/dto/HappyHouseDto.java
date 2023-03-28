package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.dto;

import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity.HappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.information.house.price.entity.HousePrice;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.global.pagenation.PageInfo;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class HappyHouseDto {

    @Getter
    public static class HappyHouseListRes {
        private PageInfo pageInfo;
        private String location;
        private String state;
        private List<HappyHouseElement> houseList;

        public HappyHouseListRes(Page<HappyHouse> housePage, String location, String state) {
            this.pageInfo = PageInfo.of(housePage, "최신순");
            this.location = location;
            this.state = state;
            List<HappyHouse> houseList = housePage.getContent();
            if (houseList != null && !houseList.isEmpty() ) {
                this.houseList = houseList.stream()
                        .map(HappyHouseElement::new)
                        .collect(Collectors.toList());
            } else {
                this.houseList = new ArrayList<>();
            }
        }
    }

    @Getter
    public static class HappyHouseElement {
        private Long houseId;
        private LocalDateTime inquiryDate;
        private String noticeDetailKind;
        private String noticeState;
        private String location;
        private String title;
        private String url;
        private LocalDateTime noticeStartDay;
        private LocalDateTime noticeEndDay;
        private LocalDateTime recruitDay;

        public HappyHouseElement(HappyHouse happyHouse) {
            this.houseId = happyHouse.getId();
            this.inquiryDate = happyHouse.getInquiryDate();
            this.noticeDetailKind = happyHouse.getNoticeDetailKind();
            this.noticeState = happyHouse.getNoticeState();
            this.location = happyHouse.getLocation();
            this.title = happyHouse.getNoticeTitle();
            this.url = happyHouse.getNoticeUrl();
            this.noticeStartDay = happyHouse.getNoticeStartDay();
            this.noticeEndDay = happyHouse.getNoticeEndDay();
            this.recruitDay = happyHouse.getRecruitDay();
        }
    }
}
