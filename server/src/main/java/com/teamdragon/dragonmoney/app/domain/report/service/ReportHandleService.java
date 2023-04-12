package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;

public interface ReportHandleService {

    Report saveReport(ReportDto.ReportPostReq newReport);

    // 신고 대상 삭제
    Long removeReport(Long reportId);
}
