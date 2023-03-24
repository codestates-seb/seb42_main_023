package com.teamdragon.dragonmoney.app.domain.reply.dto;

import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.global.pagenation.PageInfo;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class ReplyDto {
    @Getter
    public static class CreateReq {
        @NotBlank
        @Length(max=1000)
        private String content;
    }

    @Getter
    public static class UpdateReq {
        @NotBlank
        @Length(max=1000)
        private String content;
    }

    @Getter
    public static class CreateRes {
        private Long replyId;

        public CreateRes(Long replyId) {
            this.replyId = replyId;
        }
    }

    @Getter
    public static class UpdateRes {
        private Long replyId;

        public UpdateRes(Long replyId) {
            this.replyId = replyId;
        }
    }

    @Getter
    public static class ReplyListRes {
        private PageInfo pageInfo;
        private List<ReplyDto.ReplyListElement> replies;

        public ReplyListRes(Page<ReplyDto.ReplyListElement> replies, String orderBy) {
            this.pageInfo = PageInfo.of(replies, orderBy);
            this.replies = replies.getContent();
        }
    }

    @Getter
    public static class ReplyListElement {
        private Long commentId;
        private Long replyId;
        private String content;
        private String memberName;
        private String memberImage;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Boolean isModified;
        private Long thumbupCount;
        private Long thumbDownCount;
        private Boolean isThumbup;
        private Boolean isThumbdown;

        // 답글 목록 항목 : 미로그인용
        public ReplyListElement(Long commentId, Reply reply, String memberName, String memberImage, Reply.State replyState) {
            this.commentId = commentId;
            this.replyId = reply.getId();
            if (replyState == Reply.State.ACTIVE) {
                this.content = reply.getContent();
            } else {
                this.content = replyState.getMessage();
            }
            this.memberName = memberName;
            this.memberImage = memberImage;
            this.createdAt = reply.getCreatedAt();
            this.modifiedAt = reply.getModifiedAt();
            this.isModified = (this.createdAt.isEqual(this.modifiedAt));
            this.thumbupCount = reply.getThumbupCount();
            this.thumbDownCount = reply.getThumbdownCount();
        }

        // 답글 목록 항목 : 로그인 유저용
        public ReplyListElement(Long commentId, Reply reply, String memberName, String memberImage, Reply.State replyState, Long isThumbup, Long isThumbdown) {
            this.commentId = commentId;
            this.replyId = reply.getId();
            if (replyState == Reply.State.ACTIVE) {
                this.content = reply.getContent();
            } else {
                this.content = replyState.getMessage();
            }
            this.memberName = memberName;
            this.memberImage = memberImage;
            this.createdAt = reply.getCreatedAt();
            this.modifiedAt = reply.getModifiedAt();
            this.isModified = (this.createdAt.isEqual(this.modifiedAt));
            this.thumbupCount = reply.getThumbupCount();
            this.thumbDownCount = reply.getThumbdownCount();
            this.isThumbup = isThumbup != null;
            this.isThumbdown = isThumbdown != null;
        }
    }
}
