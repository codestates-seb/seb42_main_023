package com.teamdragon.dragonmoney.app.domain.image.entity;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.post.entity.Post;
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
    @JoinColumn(name = "POST_ID")
    private Post post;

    @Column(length = 200)
    private String url;

    @Column(length = 100)
    private String fileName;

    @Column(length = 10)
    private String extension;

    @Enumerated
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
    public Image(String url, String fileName, String extension, State state) {
        this.url = url;
        this.fileName = fileName;
        this.extension = extension;
        this.state = state;
    }
}
