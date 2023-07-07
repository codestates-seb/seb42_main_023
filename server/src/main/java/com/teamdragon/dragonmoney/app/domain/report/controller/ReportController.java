package com.teamdragon.dragonmoney.app.domain.report.controller;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportFindService;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportHandleService;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportOrderBy;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportTargetType;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RequestMapping("/reports")
@RequiredArgsConstructor
@Validated
@RestController
public class ReportController {
    private final ReportFindService reportFindService;
    private final ReportHandleService reportHandleService;

    // 신고 요청
    @PostMapping
    public ResponseEntity<ReportDto.ReportPostRes> createReport(@Valid @RequestBody ReportDto.ReportPostReq newReport) {
        ReportTargetType reportTargetType = checkTargetType(newReport.getTargetType());
        Report saveReport = reportHandleService.saveReport(newReport, reportTargetType);
        ReportDto.ReportPostRes response = new ReportDto.ReportPostRes(saveReport.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 신고 세부 내용 조회
    @GetMapping("/{report-id}")
    public ResponseEntity<ReportDto.ReportDetailRes> findReportDetails(@Valid @Positive @PathVariable("report-id") Long reportId) {
        ReportDto.ReportDetailRes response = reportFindService.findReport(reportId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 미처리 신고 목록 조회
    @GetMapping("/standby")
    public ResponseEntity<ReportDto.ReportListRes> findReportListByStandBy(@Valid @Positive @RequestParam int page,
                                                                           @RequestParam String orderby) {
        ReportOrderBy reportOrderBy = checkOrderBy(orderby);
        ReportDto.ReportListRes response = reportFindService.findReportList(page, reportOrderBy, Report.State.STANDBY);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 처리된 신고 목록 조회
    @GetMapping("/deleted")
    public ResponseEntity<ReportDto.ReportListRes> findReportListByDeleted(@Valid @Positive @RequestParam int page,
                                                                           @RequestParam String orderby) {
        ReportOrderBy reportOrderBy = checkOrderBy(orderby);
        ReportDto.ReportListRes response = reportFindService.findReportList(page, reportOrderBy, Report.State.DELETED);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 신고 대상 상태를 처리로 변경
    @DeleteMapping("/{report-id}")
    public ResponseEntity<ReportDto.ReportPostRes> removeReport(@Valid @Positive @PathVariable("report-id") Long reportId) {
        reportHandleService.removeReport(reportId);
        ReportDto.ReportPostRes response = new ReportDto.ReportPostRes(reportId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // orderBy 유효성 검사
    private ReportOrderBy checkOrderBy(String orderBy) {
        for (ReportOrderBy reportOrderBy : ReportOrderBy.values()) {
            if (reportOrderBy.getOrderBy().equals(orderBy)) {
                return reportOrderBy;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.ORDER_BY_NOT_VALID);
    }

    // targetType 유효성 검사
    private ReportTargetType checkTargetType(String targetType) {
        for (ReportTargetType reportTargetType : ReportTargetType.values()) {
            if (reportTargetType.getEng().equals(targetType)) {
                return reportTargetType;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.TARGET_TYPE_BY_NOT_VALID);
    }
}
