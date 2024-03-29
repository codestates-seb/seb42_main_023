package com.teamdragon.dragonmoney.app.domain.reply.entity;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountable;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Reply extends BaseTimeEntity implements ThumbCountable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 3200)
    private String content;

    @JoinColumn(name = "PARENT_COMMENT_ID")
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private Comment comment;

    @JoinColumn(name = "WRITER_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member writer;

    @Column(length = 20)
    @Enumerated(value = EnumType.STRING)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @Column
    private Long thumbupCount;

    @Column
    private Long thumbdownCount;

    @OneToMany(mappedBy = "parentReply")
    private List<Thumb> thumbs = new ArrayList<>();

    public enum State {
        ACTIVE("활성", "활성상태 입니다."),
        DELETED("삭제", "삭제된 답글입니다."),
        REPOTED("신고", "신고된 답글입니다.");

        @Getter
        private final String state;
        @Getter
        private final String message;

        State(String state, String message) {
            this.state = state;
            this.message = message;
        }
    }

    // 답글 정렬 기준
    public enum OrderBy {
        LATEST("latest", "createdAt"),
        THUMBUP("thumbup", "thumbupCount");

        @Getter
        private final String orderBy;
        @Getter
        private final String targetProperty;

        OrderBy(String orderBy, String targetProperty) {
            this.orderBy = orderBy;
            this.targetProperty = targetProperty;
        }
    }

    @Builder
    public Reply(Long id, String content, Comment comment, Member writer) {
        this.id = id;
        this.content = content;
        this.comment = comment;
        if (comment != null) {
            this.includedThisComment(comment);
        }
        this.writer = writer;
        this.state = State.ACTIVE;
        this.thumbupCount = 0L;
        this.thumbdownCount = 0L;
    }

    public void changeStateToDeleted(DeleteResult deleteResult){
        if(deleteResult.getDeleteReason() == DeleteResult.Reason.DELETED_BY_REPORT) {
            this.state = State.REPOTED;
        } else if (deleteResult.getDeleteReason() == DeleteResult.Reason.DELETED_BY_MEMBER_REMOVE) {
            this.state = State.DELETED;
        } else {
            this.state = State.DELETED;
        }
        this.deleteResult = deleteResult;
    }

    public void includedThisComment(Comment comment){
        this.comment = comment;
        if (!this.comment.getReplies().contains(this)) {
            this.comment.getReplies().add(this);
        }
    }

    public void updateContent(String content) {
        this.content = content;
    }

    @Override
    public ThumbDto getThumbCount() {
        return new ThumbDto(this.thumbupCount, this.thumbdownCount);
    }

    public void plusThumbupCount() {
        this.thumbupCount += 1;
    }

    public void minusThumbupCount() {
        this.thumbupCount -= 1;
    }

    public void plusThumbdownCount() {
        this.thumbdownCount += 1;
    }

    public void minusThumbdownCount() {
        this.thumbdownCount -= 1;
    }
}
