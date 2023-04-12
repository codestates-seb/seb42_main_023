package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;

public interface ReportFindService {

    ReportDto.ReportDetailRes findReport(Long reportId);

    ReportDto.ReportListRes findListStandByReport(int page, String orderBy);

    // 처리된 신고 목록 조회
    ReportDto.ReportListRes findListDeletedReport(int page, String orderBy);

    Report findVerifiedReport(Long reportId);

}
