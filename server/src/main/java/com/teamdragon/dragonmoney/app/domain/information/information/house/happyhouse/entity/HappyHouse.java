package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.parameters.P;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Getter
@NoArgsConstructor
@Entity
public class HappyHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime inquiryDate;

    private String noticeId;

    private String noticeKind;

    private String noticeDetailKind;

    private String noticeTitle;

    private String location;

    private String noticeState;

    private LocalDateTime noticeStartDay;

    private LocalDateTime noticeEndDay;

    private LocalDateTime recruitDay;

    private String noticeUrl;

    @Builder
    public HappyHouse(String noticeId, String noticeKind, String noticeDetailKind, String noticeTitle, String location, String noticeState, String noticeStartDay, String noticeEndDay, String recruitDay, String noticeUrl) {
        this.inquiryDate = LocalDateTime.now();
        this.noticeId = noticeId;
        this.noticeKind = noticeKind;
        this.noticeDetailKind = noticeDetailKind;
        this.noticeTitle = noticeTitle;
        this.location = location;
        this.noticeState = noticeState;
        this.noticeStartDay = getLocalDateTime(noticeStartDay);
        this.noticeEndDay = getLocalDateTime(noticeEndDay);
        this.recruitDay = getLocalDateTime(recruitDay);
        this.noticeUrl = noticeUrl;
    }

    public void updateData(HappyHouse happyHouse) {
        this.inquiryDate = happyHouse.getInquiryDate();
        this.noticeKind = happyHouse.getNoticeKind();
        this.noticeDetailKind = happyHouse.getNoticeDetailKind();
        this.noticeTitle = happyHouse.getNoticeTitle();
        this.location = happyHouse.getLocation();
        this.noticeState = happyHouse.getNoticeState();
        this.noticeStartDay = happyHouse.getNoticeStartDay();
        this.noticeEndDay = happyHouse.getNoticeEndDay();
        this.recruitDay = happyHouse.getRecruitDay();
        this.noticeUrl = happyHouse.getNoticeUrl();
    }

    private LocalDateTime getLocalDateTime(String timeString) {
        String pattern = "";
        if (timeString.length() == 8) {
            pattern = "yyyyMMddHHmmss";
            timeString += "000000";
        } else if (timeString.length() == 10) {
            pattern = "yyyy.MM.dd.HH.mm.ss";
            timeString += ".00.00.00";
        } else {
            return null;
        }
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
            return LocalDateTime.parse(timeString, formatter);
        } catch (DateTimeParseException e) {
            return null;
        }
    }
}
