package com.teamdragon.dragonmoney.app.domain.report.entity;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.report.service.ReportTargetType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 40)
    private String reportReason;

    @Column(length = 1200)
    private String description;

    @Column(length = 10)
    @Enumerated(value = EnumType.STRING)
    private ReportTargetType targetType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TARGET_COMMENT_ID")
    private Comment targetComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TARGET_REPLY_ID")
    private Reply targetReply;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TARGET_POSTS_ID")
    private Posts targetPosts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REPORTER_ID")
    private Member reporter;

    @Column
    private LocalDateTime reportedAt;

    @Column(length = 20)
    @Enumerated(value = EnumType.STRING)
    private State handleState;

    @Column
    private LocalDateTime handledAt;

    public enum State {
        STANDBY("미처리"),
        DELETED("처리");

        @Getter
        private final String state;

        State(String state) {
            this.state = state;
        }
    }

    @Builder
    public Report(String reportReason, String description, ReportTargetType targetType,
                  Comment targetComment, Reply targetReply, Posts targetPosts, Member reporter,
                  LocalDateTime reportedAt, State handleState, LocalDateTime handledAt) {
        this.reportReason = reportReason;
        this.description = description;
        this.targetType = targetType;
        this.targetComment = targetComment;
        this.targetReply = targetReply;
        this.targetPosts = targetPosts;
        this.reporter = reporter;
        this.reportedAt = reportedAt;
        this.handleState = handleState;
        this.handledAt = handledAt;
    }

    public void deleteReport(State handleState) {
        this.handleState = handleState;
        this.handledAt = LocalDateTime.now();
    }
}
