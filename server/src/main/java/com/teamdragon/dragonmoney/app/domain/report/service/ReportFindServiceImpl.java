package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.repository.ReportRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportFindServiceImpl implements ReportFindService {

    private final ReportRepository reportRepository;
    private static final int PAGE_ELEMENT_SIZE = 14;
    private static final String SORT_PROPERTY = "handledAt";

    // 신고한 글 세부 내용 조회
    @Override
    public ReportDto.ReportDetailRes findReport(Long reportId) {
        Report report = findVerifiedReport(reportId);
        ReportTargetType targetType = checkTargetType(report.getTargetType());
        String content = findContent(report, targetType);
        String writer = findReportByContentWriter(reportId, targetType);
        Long postId = findPostsIdByReport(report, targetType);

        ReportDto.ReportDetailRes reportDetailRes = ReportDto.ReportDetailRes.builder()
                .report(report)
                .targetType(targetType)
                .content(content)
                .writer(writer)
                .postId(postId)
                .build();

        return reportDetailRes;
    }

    // 신고 목록 조회
    @Override
    public ReportDto.ReportListRes findReportList(int page, ReportOrderBy reportOrderBy, Report.State handleState) {
        Pageable pageable = PageRequest.of(page - 1, PAGE_ELEMENT_SIZE, Sort.by(SORT_PROPERTY).descending());
        Page<Report> reportPage = reportRepository.findReportListByHandledState(reportOrderBy.getOrderBy(), handleState, pageable);

        return new ReportDto.ReportListRes(reportPage, reportOrderBy.getOrderBy());
    }

    // 신고된 대상 찾기
    @Override
    public Report findVerifiedReport(Long reportId) {
        Optional<Report> optionalReport = reportRepository.findById(reportId);

        return optionalReport
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.REPORT_NOT_FOUND));
    }

    // 신고된 글 세부 내용 조회
    private String findContent(Report report, ReportTargetType targetType) {
        switch (targetType) {
            case POSTS:
                return report.getTargetPosts().getTitle();
            case COMMENT:
                return report.getTargetComment().getContent();
            case REPLY:
                return report.getTargetReply().getContent();
        }
        return null;
    }

    // 신고된 글을 쓴 작성자 조회
    private String findReportByContentWriter(Long reportId, ReportTargetType targetType) {
        switch (targetType) {
            case POSTS:
                return reportRepository.findReportPostsWriter(reportId);
            case COMMENT:
                return reportRepository.findReportCommentWriter(reportId);
            case REPLY:
                return reportRepository.findReportReplyWriter(reportId);
        }
        return null;
    }

    // 신고된 글 조회
    private Long findPostsIdByReport(Report report, ReportTargetType targetType) {
        switch (targetType) {
            case POSTS:
                return report.getTargetPosts().getId();
            case COMMENT:
                return report.getTargetComment().getPosts().getId();
            case REPLY:
                return report.getTargetReply().getComment().getPosts().getId();
        }
        return null;
    }

    // targetType enum 으로 타입 변환
    private ReportTargetType checkTargetType(String targetType) {
        for (ReportTargetType reportTargetType : ReportTargetType.values()) {
            if (reportTargetType.getKor().equals(targetType)) {
                return reportTargetType;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.TARGET_TYPE_BY_NOT_VALID);
    }
}
