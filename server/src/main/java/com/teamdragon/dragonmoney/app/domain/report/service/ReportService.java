package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentService;
import com.teamdragon.dragonmoney.app.domain.common.service.FinderService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyService;
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

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final FinderService finderService;
    private final PostsService postsService;
    private final CommentService commentService;
    private final ReplyService replyService;
    private final int PAGE_ELEMENT_SIZE = 14;
    private final String POST_ENG = "post";
    private final String COMMENT_ENG = "comment";
    private final String REPLY_ENG = "reply";
    private final String POST_KOR = "게시글";
    private final String COMMENT_KOR = "댓글";
    private final String REPLY_KOR = "답글";
    private final String All_ENG = "all";
    private final String SORT_PROPERTY = "handledAt";

    // 신고 요청
    public Report saveReport(ReportDto.ReportPostReq newReport) {
        Member reporter = finderService.findVerifiedMemberByName(newReport.getReporterName());
        Posts targetPosts = null;
        Comment targetComment = null;
        Reply targetReply = null;

        if (newReport.getPostId() != null) {
            targetPosts = finderService.findVerifyPostsById(newReport.getPostId());
        } else if (newReport.getCommentId() != null) {
            targetComment = finderService.findVerifyCommentById(newReport.getCommentId());
        } else {
            targetReply = finderService.findVerifyReplyById(newReport.getReplyId());
        }
        Report report = Report.builder()
                .reportReason(newReport.getReportReason())
                .description(newReport.getDescription())
                .targetType(newReport.getTargetType())
                .reporter(reporter)
                .targetPosts(targetPosts)
                .targetComment(targetComment)
                .targetReply(targetReply)
                .handleState(Report.State.STANDBY)
                .reportedAt(LocalDateTime.now())
                .build();

        return reportRepository.save(report);
    }

    // 신고한 글 세부 내용 조회
    public ReportDto.ReportDetailRes findReport(Long reportId) {
        Report report = findVerifiedReport(reportId);
        String targetType = renameTheTargetType(report.getTargetType());
        String content = findContent(report, targetType);
        String writer = findReportContentWriter(reportId, targetType);
        Long postId = findPostIdToReport(report, targetType);

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
    public Page<Report> findListStandByReport(int page, String orderBy) {

        if (orderBy.equals(POST_ENG) || orderBy.equals(COMMENT_ENG) || orderBy.equals(REPLY_ENG) || orderBy.equals(All_ENG)){
            Pageable pageable = PageRequest.of(page - 1, PAGE_ELEMENT_SIZE, Sort.by(SORT_PROPERTY).descending());
            return reportRepository.findStandbyReportListByHandledState(orderBy, Report.State.STANDBY, pageable);
        } else {
            throw new BusinessLogicException(BusinessExceptionCode.BAD_REQUEST);
        }
    }

    // 처리된 신고 목록 조회
    public Page<Report> findListDeletedReport(int page, String orderBy) {

        if (orderBy.equals(POST_ENG) || orderBy.equals(COMMENT_ENG) || orderBy.equals(REPLY_ENG) || orderBy.equals(All_ENG)){
            Pageable pageable = PageRequest.of(page - 1, PAGE_ELEMENT_SIZE, Sort.by(SORT_PROPERTY).descending());
            return reportRepository.findDeletedReportListByHandledState(orderBy, Report.State.DELETED, pageable);
        } else {
            throw new BusinessLogicException(BusinessExceptionCode.BAD_REQUEST);
        }
    }

    // 신고 대상 삭제
    public Long removeReport(Long reportId) {
        Report report = findVerifiedReport(reportId);
        report.deleteReport(Report.State.DELETED);

        if (report.getTargetPosts() != null) {
            Posts targetPosts = finderService.findVerifyPostsById(report.getTargetPosts().getId());
            postsService.removeRepostedPosts(targetPosts.getWriter(), targetPosts);
        } else if (report.getTargetComment() != null) {
            Comment targetComment = finderService.findVerifyCommentById(report.getTargetComment().getId());
            commentService.removeReportComment(targetComment);
        } else {
            Reply targetReply = finderService.findVerifyReplyById(report.getTargetReply().getId());
            replyService.removeReportReply(targetReply);
        }

        reportRepository.save(report);

        return reportId;
    }

    // 신고된 대상 찾기
    private Report findVerifiedReport(Long reportId) {
        Optional<Report> optionalReport = reportRepository.findById(reportId);

        return optionalReport
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.REPORT_NOT_FOUND));
    }

    // targetType 한글로 변환
    private String renameTheTargetType (String targetType) {
        if(targetType.equals(POST_ENG)) {
            return targetType.replace(POST_ENG, POST_KOR);
        } else if (targetType.equals(COMMENT_ENG)) {
            return targetType.replace(COMMENT_ENG, COMMENT_KOR);

        } else if (targetType.equals(REPLY_ENG)) {
            return targetType.replace(REPLY_ENG, REPLY_KOR);
        }
        return null;
    }

    // 신고된 글을 쓴 작성자 조회
    private String findReportContentWriter (Long reportId, String targetType) {
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
    private Long findPostIdToReport(Report report, String targetType) {
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
}
