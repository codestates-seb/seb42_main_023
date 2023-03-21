package com.teamdragon.dragonmoney.app.domain.bookmark.entity;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;

import javax.persistence.*;

@Entity
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POSTS_ID")
    private Posts posts;
}
