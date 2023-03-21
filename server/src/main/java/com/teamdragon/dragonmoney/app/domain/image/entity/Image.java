package com.teamdragon.dragonmoney.app.domain.image.entity;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "UPLOADER_ID")
    private Member uploader;

    @ManyToOne
    @JoinColumn(name = "POSTS_ID")
    private Posts posts;

    @Column(length = 200)
    private String url;

    @Column(length = 100)
    private String fileName;

    @Column(length = 10)
    private String extension;

    @Enumerated(value = EnumType.STRING)
    private State state;

    public enum State {
        WRITING("writing"),
        POSTED("posted");

        @Getter
        private final String state;

        State(String state) {
            this.state = state;
        }
    }

    @Builder
    public Image(Long id, Member uploader, String url, String fileName, String extension, State state) {
        this.id = id; // 매퍼 사용용
        this.uploader = uploader;
        this.url = url;
        this.fileName = fileName;
        this.extension = extension;
        this.state = state;
    }

    public void includedThisPosts(Posts posts){
        this.posts = posts;
        if (!this.posts.getImages().contains(this)) {
            this.posts.getImages().add(this);
        }
    }
}
