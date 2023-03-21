package com.teamdragon.dragonmoney.app.domain.reply.entity;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountable;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Reply  implements ThumbCountable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "PARENT_COMMENT_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Comment comment;

    @Column
    private Long thumbupCount;

    @Column
    private Long thumbdownCount;

    @Override
    public Thumb getThumbCount() {
        return new Thumb(this.thumbupCount, this.thumbdownCount);
    }

    public void includedThisComment(Comment comment){
        this.comment = comment;
        if (!this.comment.getReplies().contains(this)) {
            this.comment.getReplies().add(this);
        }
    }
}
