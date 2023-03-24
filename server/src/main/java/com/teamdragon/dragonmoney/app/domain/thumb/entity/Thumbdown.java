package com.teamdragon.dragonmoney.app.domain.thumb.entity;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Thumbdown {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_POST_ID")
    private Posts parentPosts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_COMMENT_ID")
    private Comment parentComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_REPLY_ID")
    private Reply parentReply;

    @Builder
    public Thumbdown(Member member, Posts parentPosts, Comment parentComment, Reply parentReply) {
        this.member = member;
        this.parentPosts = parentPosts;
        this.parentComment = parentComment;
        this.parentReply = parentReply;
    }
}
