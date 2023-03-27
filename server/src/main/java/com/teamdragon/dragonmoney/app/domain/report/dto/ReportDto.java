package com.teamdragon.dragonmoney.app.domain.report.dto;

import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.global.pagenation.PageInfo;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ReportDto {
    // 신고 등록 요청 Dto
    @Getter
    public static class ReportPostReq {
        @NotNull
        @Size(max = 40)
        private String reportReason;

        @NotNull
        @Size(min = 2, max = 120)
        private String description;

        @NotNull
        @Size(max = 10)
        private String targetType;

        private Long postId;

        private Long commentId;

        private Long replyId;

        private String reporterName;
    }

    // 신고 등록 응답 Dto
    @Getter
    public static class ReportPostRes {
        private Long reportId;

        public ReportPostRes(Long reportId) {
            this.reportId = reportId;
        }
    }

    // 신고한 글 세부 내용 응답 Dto
    @Getter
    public static class ReportDetailRes {
        private Long reportId;
        private LocalDateTime reportedAt;
        private String reportCategory;
        private String targetType;
        private String content;
        private String writer;
        private String reporter;
        private String description;
        private Long postId;

        @Builder
        public ReportDetailRes(Report report, String targetType,
                               String content, String writer, Long postId) {
            this.reportId = report.getId();
            this.reportedAt = report.getReportedAt();
            this.reportCategory = report.getReportReason();
            this.targetType = targetType;
            this.content = content;
            this.writer = writer;
            this.reporter = report.getReporter().getName();
            this.description = report.getDescription();
            this.postId = postId;
        }
    }

    // 신고 목록 응답 Dto (+페이지 정보)
    @Getter
    public static class ReportListRes {
        private PageInfo pageInfo;
        private List<ReportDto.ReportListElement> reports;

        public ReportListRes(Page<Report> reportPage, String orderBy) {
            this.pageInfo = PageInfo.of(reportPage, orderBy);

            List<Report> reportsList = reportPage.getContent();
            if (reportsList != null) {
                reports = reportsList.stream()
                        .map(ReportDto.ReportListElement::new)
                        .collect(Collectors.toList());
            }
        }
    }

    // 신고한 글 목록 Element
    @Getter
    public static class ReportListElement {
        private Long reportId;
        private LocalDateTime reportedAt;
        private String reportCategory;
        private String targetType;
        private String description;
        private String  writer;
        private Long postId;

        public ReportListElement(Report report) {
            this.reportId = report.getId();
            this.reportedAt = report.getReportedAt();
            this.reportCategory = report.getReportReason();
            this.targetType = report.getTargetType();
            this.description = report.getDescription();
            if(targetType.equals("post")) {
                this.targetType = "게시글";
                this.writer = report.getTargetPosts().getWriter().getName();
                this.postId = report.getTargetPosts().getId();
            } else if (targetType.equals("comment")) {
                this.targetType = "댓글";
                this.writer = report.getTargetComment().getWriter().getName();
                this.postId = report.getTargetComment().getPosts().getId();
            } else if (targetType.equals("reply")) {
                this.targetType = "답글";
                this.writer = report.getTargetReply().getWriter().getName();
                this.postId = report.getTargetReply().getComment().getPosts().getId();
            }
        }
    }
}
