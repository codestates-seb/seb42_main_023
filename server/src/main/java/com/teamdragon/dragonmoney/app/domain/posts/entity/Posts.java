package com.teamdragon.dragonmoney.app.domain.posts.entity;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountable;
import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;
import com.teamdragon.dragonmoney.app.global.entity.DeleteResult;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity implements ThumbCountable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "WRITER_ID")
    private Member writer;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    @Setter
    @Column
    private Long viewCount;

    @Setter
    @Column(length = 80)
    private String title;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String content;

    @Setter
    @Column
    @Enumerated(value = EnumType.STRING)
    private State state;

    @Setter
    @OneToOne
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @Column
    private Long thumbupCount;

    @Column
    private Long thumbdownCount;

    @Column
    private Long commentCount;

//    @OneToMany(mappedBy = "post")
//    private List<Comment> comments = new ArrayList<>();
//
//    @OneToMany(mappedBy = "post")
//    private List<Thumbup> thumbups = new ArrayList<>();
//
//    @OneToMany(mappedBy = "post")
//    private List<Thumbdown> thumbdowns = new ArrayList<>();
//
//    @OneToMany(mappedBy = "post")
//    private List<PostTag> tags = new ArrayList<>();

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
        LATEST("latest"),
        THUMBUP("thumbup"),
        VIEW_COUNT("viewCount");

        @Getter
        private final String orderBy;

        OrderBy(String orderBy) {
            this.orderBy = orderBy;
        }
    }

    @Builder
    public Posts(Member writer, Category category, Long viewCount, String title, String content, State state, DeleteResult deleteResult) {
        this.writer = writer;
        this.category = category;
        this.viewCount = viewCount;
        this.title = title;
        this.content = content;
        this.state = state;
        this.deleteResult = deleteResult;
    }

    @Override
    public Thumb getThumbCount() {
        return new Thumb(this.thumbupCount, thumbdownCount);
    }
}