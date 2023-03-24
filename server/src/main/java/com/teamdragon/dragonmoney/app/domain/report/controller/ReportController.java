package com.teamdragon.dragonmoney.app.domain.report.controller;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@CrossOrigin
@RequestMapping("/reports")
@RequiredArgsConstructor
@RestController
public class ReportController {
    private final ReportService reportService;

    // 신고 요청
    @PostMapping
    public ResponseEntity postReport(@Valid @RequestBody ReportDto.ReportPostReq newReport) {
        Report saveReport = reportService.saveReport(newReport);
        ReportDto.ReportPostRes response = new ReportDto.ReportPostRes(saveReport.getId());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 신고 세부 내용 조회
    @GetMapping("/{report-id}")
    public ResponseEntity getReport(@PathVariable("report-id") Long reportId) {
        ReportDto.ReportDetailRes response = reportService.findReport(reportId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 미처리 신고 목록 조회
    @GetMapping("/standby")
    public ResponseEntity getStandByReports(@Valid @Positive @RequestParam int page,
                                            @RequestParam String orderby) {
        Page<Report> reportPage = reportService.findListStandByReport(page, orderby);
        ReportDto.ReportListRes reponse = new ReportDto.ReportListRes(reportPage, orderby);

        return ResponseEntity.status(HttpStatus.OK).body(reponse);
    }

    // 처리된 신고 목록 조회
    @GetMapping("/deleted")
    public ResponseEntity getDeletedReports(@Valid @Positive @RequestParam int page,
                                            @RequestParam String orderby) {
        Page<Report> reportPage = reportService.findListDeletedReport(page, orderby);
        ReportDto.ReportListRes reponse = new ReportDto.ReportListRes(reportPage, orderby);

        return ResponseEntity.status(HttpStatus.OK).body(reponse);
    }

    // 신고 대상 상태를 처리로 변경
    @DeleteMapping("/{report-id}")
    public ResponseEntity deleteReport(@PathVariable("report-id") @Positive Long reportId) {
        reportService.removeReport(reportId);
        ReportDto.ReportPostRes response = new ReportDto.ReportPostRes(reportId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
