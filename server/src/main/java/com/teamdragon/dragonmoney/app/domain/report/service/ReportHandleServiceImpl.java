package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentHandleService;
import com.teamdragon.dragonmoney.app.domain.common.service.FinderService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleService;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyHandleService;
import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportHandleServiceImpl implements ReportHandleService {

    private final ReportFindService reportFindService;
    private final ReportRepository reportRepository;

    private final FinderService finderService;
    private final PostsHandleService postsHandleService;
    private final CommentHandleService commentHandleService;
    private final ReplyHandleService replyHandleService;

    // 신고 요청
    @Override
    public Report saveReport(ReportDto.ReportPostReq newReport, ReportTargetType reportTargetType) {
        Member reporter = finderService.findVerifiedMemberByName(newReport.getReporterName());
        String targetType = renameTargetType(reportTargetType);
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
                .targetType(targetType)
                .reporter(reporter)
                .targetPosts(targetPosts)
                .targetComment(targetComment)
                .targetReply(targetReply)
                .handleState(Report.State.STANDBY)
                .reportedAt(LocalDateTime.now())
                .build();

        return reportRepository.save(report);
    }

    // 신고 대상 삭제
    @Override
    public Long removeReport(Long reportId) {
        Report report = reportFindService.findVerifiedReport(reportId);
        report.deleteReport(Report.State.DELETED);

        if (report.getTargetPosts() != null) {
            Posts targetPosts = finderService.findVerifyPostsById(report.getTargetPosts().getId());
            postsHandleService.removeRepostedPosts(targetPosts.getWriter(), targetPosts);
        } else if (report.getTargetComment() != null) {
            Comment targetComment = finderService.findVerifyCommentById(report.getTargetComment().getId());
            commentHandleService.removeCommentByReport(targetComment);
        } else {
            Reply targetReply = finderService.findVerifyReplyById(report.getTargetReply().getId());
            replyHandleService.removeReplyByReport(targetReply);
        }

        reportRepository.save(report);

        return reportId;
    }

    // targetType 한글로 변환
    private String renameTargetType(ReportTargetType targetType) {
        switch (targetType) {
            case POSTS:
                return ReportTargetType.POSTS.getKor();
            case COMMENT:
                return ReportTargetType.COMMENT.getKor();
            case REPLY:
                return ReportTargetType.REPLY.getKor();
        }
        return null;
    }
}
