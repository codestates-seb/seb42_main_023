package com.teamdragon.dragonmoney.app.domain.posts.entity;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class PostsTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POSTS_ID")
    private Posts posts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @Builder
    public PostsTag(Posts posts, Tag tag) {
        this.posts = posts;
        this.tag = tag;
    }

    public void includedThisPosts(Posts posts){
        this.posts = posts;
        if (!this.posts.getPostsTags().contains(this)) {
            this.posts.getPostsTags().add(this);
        }
    }
}
