package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;

public interface ReportFindService {

    ReportDto.ReportDetailRes findReport(Long reportId);

    ReportDto.ReportListRes findReportList(int page, ReportOrderBy reportOrderBy, Report.State handleState);

    Report findVerifiedReport(Long reportId);
}
