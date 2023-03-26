package com.teamdragon.dragonmoney.app.domain.comment.entity;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountable;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbdown;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbup;
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
public class Comment extends BaseTimeEntity implements ThumbCountable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 3200)
    private String content;

    @JoinColumn(name = "PARENT_POSTS_ID")
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private Posts posts;

    @JoinColumn(name = "WRITER_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member writer;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.PERSIST)
    private List<Reply> replies = new ArrayList<>();

    @Column(length = 20)
    @Enumerated(value = EnumType.STRING)
    private Comment.State state;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @Column
    private Long replyCount;

    @Column
    private Long thumbupCount;

    @Column
    private Long thumbdownCount;

    @OneToMany(mappedBy = "parentComment")
    private List<Thumbup> thumbups = new ArrayList<>();

    @OneToMany(mappedBy = "parentComment")
    private List<Thumbdown> thumbdowns = new ArrayList<>();

    public enum State {
        ACTIVE("활성", "활성상태 입니다."),
        DELETED("삭제", "삭제된 댓글입니다.");

        @Getter
        private final String state;
        @Getter
        private final String message;

        State(String state, String message) {
            this.state = state;
            this.message = message;
        }
    }

    // 댓글 정렬 기준
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
    public Comment(Long id, String content, Posts posts, Member writer) {
        this.id = id;
        this.content = content;
        this.posts = posts;
        if (posts != null) {
            this.includedThisPosts(posts);
        }
        this.writer = writer;
        this.state = State.ACTIVE;
        this.thumbupCount = 0L;
        this.thumbdownCount = 0L;
        this.replyCount = 0L;
    }

    public String displayContentMessageByState() {
        if (this.state == State.DELETED
                && this.deleteResult.getDeleteReason() == DeleteResult.Reason.DELETED_BY_REPORT) {
            return "신고된 댓글입니다.";
        }
        else if (this.state == State.DELETED
                && this.deleteResult.getDeleteReason() == DeleteResult.Reason.SELF_DELETED) {
            return "삭제된 댓글입니다.";
        } else {
            return this.content;
        }
    }

    public void includedThisPosts(Posts posts){
        this.posts = posts;
        if (!this.posts.getComments().contains(this)) {
            this.posts.getComments().add(this);
        }
    }

    public void addReply(Reply reply) {
        this.replies.add(reply);
        if (reply.getComment() != this) {
            reply.includedThisComment(this);
        }
    }

    @Override
    public ThumbDto getThumbCount() {
        return new ThumbDto(this.thumbupCount, this.thumbdownCount);
    }

    public void changeStateToDeleted(DeleteResult deleteResult){
        this.state = State.DELETED;
        this.deleteResult = deleteResult;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void plusReplyCount() {
        this.replyCount += 1;
    }

    public void minusReplyCount() {
        this.replyCount -= 1;
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
