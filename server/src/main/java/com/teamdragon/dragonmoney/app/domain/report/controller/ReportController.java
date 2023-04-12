package com.teamdragon.dragonmoney.app.domain.report.controller;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportFindService;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportHandleService;
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
        Report saveReport = reportHandleService.saveReport(newReport);
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
        ReportDto.ReportListRes response = reportFindService.findListStandByReport(page, orderby);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 처리된 신고 목록 조회
    @GetMapping("/deleted")
    public ResponseEntity<ReportDto.ReportListRes> findReportListByDeleted(@Valid @Positive @RequestParam int page,
                                                                           @RequestParam String orderby) {
        ReportDto.ReportListRes response = reportFindService.findListDeletedReport(page, orderby);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 신고 대상 상태를 처리로 변경
    @DeleteMapping("/{report-id}")
    public ResponseEntity<ReportDto.ReportPostRes> removeReport(@Valid @Positive @PathVariable("report-id") Long reportId) {
        reportHandleService.removeReport(reportId);
        ReportDto.ReportPostRes response = new ReportDto.ReportPostRes(reportId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
