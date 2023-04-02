package com.teamdragon.dragonmoney.app.domain.report.controller;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    private final ReportService reportService;

    // 신고 요청
    @PostMapping
    public ResponseEntity postReport(@Valid @RequestBody ReportDto.ReportPostReq newReport) {
        Report saveReport = reportService.saveReport(newReport);
        ReportDto.ReportPostRes response = new ReportDto.ReportPostRes(saveReport.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 신고 세부 내용 조회
    @GetMapping("/{report-id}")
    public ResponseEntity getReport(@Valid @Positive @PathVariable("report-id") Long reportId) {
        ReportDto.ReportDetailRes response = reportService.findReport(reportId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 미처리 신고 목록 조회
    @GetMapping("/standby")
    public ResponseEntity getStandByReports(@Valid @Positive @RequestParam int page,
                                            @RequestParam String orderBy) {
        ReportDto.ReportListRes response = reportService.findListStandByReport(page, orderBy);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 처리된 신고 목록 조회
    @GetMapping("/deleted")
    public ResponseEntity getDeletedReports(@Valid @Positive @RequestParam int page,
                                            @RequestParam String orderby) {
        ReportDto.ReportListRes response = reportService.findListDeletedReport(page, orderby);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 신고 대상 상태를 처리로 변경
    @DeleteMapping("/{report-id}")
    public ResponseEntity deleteReport(@Valid @Positive @PathVariable("report-id") Long reportId) {
        reportService.removeReport(reportId);
        ReportDto.ReportPostRes response = new ReportDto.ReportPostRes(reportId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
