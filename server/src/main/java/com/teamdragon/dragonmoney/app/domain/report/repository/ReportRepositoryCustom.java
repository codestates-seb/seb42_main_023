package com.teamdragon.dragonmoney.app.domain.report.repository;

import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReportRepositoryCustom {
    String findReportPostsWriter(Long reportId);
    String findReportCommentWriter(Long reportId);
    String findReportReplyWriter(Long reportId);
    Page<Report> findStandbyReportListByHandledState(String orderby, Report.State handledState, Pageable pageable);
}
