package com.teamdragon.dragonmoney.app.domain.comment.dto;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.global.pagenation.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    public static class CreateReq {
        @NotBlank
        @Length(max=1000)
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class UpdateReq {
        @NotBlank
        @Length(max=1000)
        private String content;
    }

    @Getter
    public static class CreateRes {
        private Long commentId;

        public CreateRes(Long commentId) {
            this.commentId = commentId;
        }
    }

    @Getter
    public static class UpdateRes {
        private Long commentId;

        public UpdateRes(Long commentId) {
            this.commentId = commentId;
        }
    }

    @Getter
    public static class CommentListRes {
        private PageInfo pageInfo;
        private List<CommentListElement> comments;

        public CommentListRes(Page<CommentListElement> comments, String orderBy) {
            this.pageInfo = PageInfo.of(comments, orderBy);
            this.comments = comments.getContent();
        }
    }

    @Getter
    public static class CommentListElement {
        private Long postId;
        private Long commentId;
        private String content;
        private String memberName;
        private String memberImage;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Boolean isModified;
        private Long replyCount;
        private Long thumbupCount;
        private Long thumbDownCount;
        private Boolean isThumbup;
        private Boolean isThumbdown;
        private Boolean isDeleted;

        // 댓글 목록 항목 : 미로그인용
        public CommentListElement(Long postsId, Comment comment, String memberName, String memberImage, Comment.State commentState) {
            this.postId = postsId;
            this.commentId = comment.getId();
            if (commentState == Comment.State.ACTIVE) {
                this.content = comment.getContent();
                this.isDeleted = false;
            } else {
                this.content = commentState.getMessage();
                this.isDeleted = true;
            }
            this.memberName = memberName;
            this.memberImage = memberImage;
            this.createdAt = comment.getCreatedAt();
            this.modifiedAt = comment.getModifiedAt();
            this.isModified = (this.createdAt.isEqual(this.modifiedAt));
            this.replyCount = comment.getReplyCount();
            this.thumbupCount = comment.getThumbupCount();
            this.thumbDownCount = comment.getThumbdownCount();
        }

        // 댓글 목록 항목 : 로그인 유저용
        public CommentListElement(Long postsId, Comment comment, String memberName, String memberImage, Comment.State commentState, Long isThumbup, Long isThumbdown) {
            this.postId = postsId;
            this.commentId = comment.getId();
            if (commentState == Comment.State.ACTIVE) {
                this.content = comment.getContent();
                this.isDeleted = false;
            } else {
                this.content = commentState.getMessage();
                this.isDeleted = true;
            }
            this.memberName = memberName;
            this.memberImage = memberImage;
            this.createdAt = comment.getCreatedAt();
            this.modifiedAt = comment.getModifiedAt();
            this.isModified = (this.createdAt.isEqual(this.modifiedAt));
            this.replyCount = comment.getReplyCount();
            this.thumbupCount = comment.getThumbupCount();
            this.thumbDownCount = comment.getThumbdownCount();
            this.isThumbup = isThumbup != null;
            this.isThumbdown = isThumbdown != null;
        }
    }
}
