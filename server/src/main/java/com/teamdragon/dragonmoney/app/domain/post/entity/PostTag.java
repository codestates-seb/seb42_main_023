package com.teamdragon.dragonmoney.app.domain.post.entity;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
public class PostTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @Builder
    public PostTag(Post post, Tag tag) {
        this.post = post;
        this.tag = tag;
    }
}
