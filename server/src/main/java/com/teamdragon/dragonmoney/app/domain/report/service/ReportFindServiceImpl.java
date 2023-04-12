package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.repository.ReportRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
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
    private static final String POST_ENG = "post";
    private static final String COMMENT_ENG = "comment";
    private static final String REPLY_ENG = "reply";
    private static final String POST_KOR = "게시글";
    private static final String COMMENT_KOR = "댓글";
    private static final String REPLY_KOR = "답글";
    private static final String All_ENG = "all";
    private static final String SORT_PROPERTY = "handledAt";

    // 신고한 글 세부 내용 조회
    @Override
    public ReportDto.ReportDetailRes findReport(Long reportId) {
        Report report = findVerifiedReport(reportId);
        String targetType = renameTargetType(report.getTargetType());
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

    // 미처리 신고 목록 조회
    @Override
    public ReportDto.ReportListRes findListStandByReport(int page, String orderBy) {

        if (orderBy.equals(POST_ENG) || orderBy.equals(COMMENT_ENG) || orderBy.equals(REPLY_ENG) || orderBy.equals(All_ENG)){
            Pageable pageable = PageRequest.of(page - 1, PAGE_ELEMENT_SIZE, Sort.by(SORT_PROPERTY).descending());
            Page<Report> reportPage = reportRepository.findStandbyReportListByHandledState(orderBy, Report.State.STANDBY, pageable);

            return new ReportDto.ReportListRes(reportPage, orderBy);
        } else {
            throw new BusinessLogicException(BusinessExceptionCode.BAD_REQUEST);
        }
    }

    // 처리된 신고 목록 조회
    @Override
    public ReportDto.ReportListRes findListDeletedReport(int page, String orderBy) {

        if (orderBy.equals(POST_ENG) || orderBy.equals(COMMENT_ENG) || orderBy.equals(REPLY_ENG) || orderBy.equals(All_ENG)){
            Pageable pageable = PageRequest.of(page - 1, PAGE_ELEMENT_SIZE, Sort.by(SORT_PROPERTY).descending());
            Page<Report> reportPage = reportRepository.findDeletedReportListByHandledState(orderBy, Report.State.DELETED, pageable);

            return new ReportDto.ReportListRes(reportPage, orderBy);
        } else {
            throw new BusinessLogicException(BusinessExceptionCode.BAD_REQUEST);
        }
    }

    // 신고된 대상 찾기
    @Override
    public Report findVerifiedReport(Long reportId) {
        Optional<Report> optionalReport = reportRepository.findById(reportId);

        return optionalReport
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.REPORT_NOT_FOUND));
    }

    // 신고된 글을 쓴 작성자 조회
    private String findReportByContentWriter(Long reportId, String targetType) {
        if(targetType.equals(POST_KOR)) {
            return reportRepository.findReportPostsWriter(reportId);

        } else if (targetType.equals(COMMENT_KOR)) {
            return reportRepository.findReportCommentWriter(reportId);

        } else if (targetType.equals(REPLY_KOR)) {
            return reportRepository.findReportReplyWriter(reportId);
        }
        return null;
    }

    // 신고된 글 조회
    private Long findPostsIdByReport(Report report, String targetType) {
        if(targetType.equals(POST_KOR)) {
            return report.getTargetPosts().getId();
        } else if (targetType.equals(COMMENT_KOR)) {
            return report.getTargetComment().getPosts().getId();
        } else if (targetType.equals(REPLY_KOR)) {
            return report.getTargetReply().getComment().getPosts().getId();
        }
        return null;
    }

    // 신고된 글 세부 내용 조회
    private String findContent(Report report, String targetType) {
        if(targetType.equals(POST_KOR)) {
            return report.getTargetPosts().getTitle();

        } else if (targetType.equals(COMMENT_KOR)) {
            return report.getTargetComment().getContent();

        } else if (targetType.equals(REPLY_KOR)) {
            return report.getTargetReply().getContent();
        }
        return null;
    }

    // targetType 한글로 변환
    private String renameTargetType(String targetType) {
        if(targetType.equals(POST_ENG)) {
            return targetType.replace(POST_ENG, POST_KOR);
        } else if (targetType.equals(COMMENT_ENG)) {
            return targetType.replace(COMMENT_ENG, COMMENT_KOR);

        } else if (targetType.equals(REPLY_ENG)) {
            return targetType.replace(REPLY_ENG, REPLY_KOR);
        }
        return null;
    }
}
