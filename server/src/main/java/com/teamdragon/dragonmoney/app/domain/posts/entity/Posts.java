package com.teamdragon.dragonmoney.app.domain.posts.entity;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountable;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbdown;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbup;
import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;
import com.teamdragon.dragonmoney.app.global.entity.DeleteResult;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

// @ToString
@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity implements ThumbCountable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column
    private Long viewCount;

    @Setter
    @Column(length = 80)
    private String title;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private Long thumbupCount;

    @Column
    private Long thumbdownCount;

    @Column
    private Long commentCount;

    @Setter
    @Column
    @Enumerated(value = EnumType.STRING)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "WRITER_ID")
    private Member writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    //    @OneToMany(mappedBy = "posts")
    //    private List<Comment> comments = new ArrayList<>();

    @Setter
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @OneToMany(mappedBy = "posts", cascade = CascadeType.PERSIST)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "posts", cascade = CascadeType.PERSIST)
    private List<PostsTag> postsTags = new ArrayList<>();
//
    @OneToMany(mappedBy = "parentPosts")
    private List<Thumbup> thumbups = new ArrayList<>();

    @OneToMany(mappedBy = "parentPosts")
    private List<Thumbdown> thumbdowns = new ArrayList<>();

    // 게시글 상태
    public enum State {
        ACTIVE("활성"),
        DELETED("삭제");

        @Getter
        private final String state;

        State(String state) {
            this.state = state;
        }
    }

    // 게시글 정렬 기준
    public enum OrderBy {
        LATEST("latest", "createdAt"),
        THUMBUP("thumbup", "thumbupCount"),
        VIEW_COUNT("view-count", "viewCount");

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
    public Posts(Member writer, Category category, String title, String content, List<Image> images, List<PostsTag> postsTags) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.category = category;
        this.images = images;
        if (images != null) {
            for (Image image : images) {
                image.includedThisPosts(this);
            }
        }
        if (postsTags != null) {
            for (PostsTag postsTag : postsTags) {
                postsTag.includedThisPosts(this);
            }
        }
        this.state = State.ACTIVE;
        this.deleteResult = null;
        this.viewCount = 0L;
        this.thumbupCount = 0L;
        this.thumbdownCount = 0L;
        this.commentCount = 0L;
    }

    @Override
    public Thumb getThumbCount() {
        return new Thumb(this.thumbupCount, this.thumbdownCount);
    }

    public void addImage(Image image) {
        this.images.add(image);
        if (image.getPosts() != this) {
            image.includedThisPosts(this);
        }
    }

    public void addPostsTag(PostsTag postsTag) {
        this.postsTags.add(postsTag);
        if (postsTag.getPosts() != this) {
            postsTag.includedThisPosts(this);
        }
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content){
        this.content = content;
    }

    public void changeStateToDeleted(DeleteResult deleteResult){
        this.state = State.DELETED;
        this.deleteResult = deleteResult;
    }

    public List<String> getTagNames() {
        return this.postsTags.stream()
                .map(pt -> pt.getTag().getName()).collect(Collectors.toList());
    }
}