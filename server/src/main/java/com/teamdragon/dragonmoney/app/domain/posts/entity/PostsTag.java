package com.teamdragon.dragonmoney.app.domain.posts.entity;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
public class PostsTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Posts posts;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @Builder
    public PostsTag(Posts posts, Tag tag) {
        this.posts = posts;
        this.tag = tag;
    }
}
