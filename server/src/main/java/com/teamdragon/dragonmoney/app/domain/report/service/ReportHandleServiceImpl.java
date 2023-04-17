package com.teamdragon.dragonmoney.app.domain.report.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentFindService;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentHandleService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsFindService;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleService;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyFindService;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyHandleService;
import com.teamdragon.dragonmoney.app.domain.report.dto.ReportDto;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.domain.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static com.teamdragon.dragonmoney.app.domain.report.service.ReportTargetType.COMMENT;
import static com.teamdragon.dragonmoney.app.domain.report.service.ReportTargetType.POSTS;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportHandleServiceImpl implements ReportHandleService {

    private final ReportRepository reportRepository;
    private final ReportFindService reportFindService;
    private final PostsHandleService postsHandleService;
    private final CommentHandleService commentHandleService;
    private final ReplyHandleService replyHandleService;
    private final MemberFindService memberFindService;
    private final PostsFindService postsFindService;
    private final CommentFindService commentFindService;
    private final ReplyFindService replyFindService;

    // 신고 요청
    @Override
    public Report saveReport(ReportDto.ReportPostReq newReport, ReportTargetType reportTargetType) {
        Member reporter = memberFindService.findVerifyMemberByName(newReport.getReporterName());
        Posts targetPosts = null;
        Comment targetComment = null;
        Reply targetReply = null;

        if (reportTargetType == POSTS) {
            targetPosts = postsFindService.findVerifyPostsById(newReport.getPostId());
        } else if (reportTargetType == COMMENT) {
            targetComment = commentFindService.findVerifyCommentById(newReport.getCommentId());
        } else {
            targetReply = replyFindService.findVerifyReplyById(newReport.getReplyId());
        }

        Report report = Report.builder()
                .reportReason(newReport.getReportReason())
                .description(newReport.getDescription())
                .targetType(reportTargetType)
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
            Posts targetPosts = postsFindService.findVerifyPostsById(report.getTargetPosts().getId());
            postsHandleService.removeRepostedPosts(targetPosts.getWriter(), targetPosts);
        } else if (report.getTargetComment() != null) {
            Comment targetComment = commentFindService.findVerifyCommentById(report.getTargetComment().getId());
            commentHandleService.removeCommentByReport(targetComment);
        } else {
            Reply targetReply = replyFindService.findVerifyReplyById(report.getTargetReply().getId());
            replyHandleService.removeReplyByReport(targetReply);
        }

        reportRepository.save(report);

        return reportId;
    }
}
