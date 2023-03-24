package com.teamdragon.dragonmoney.app.domain.popular.entity;

import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

// 명예의 전당
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
public class BestAwards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(name = "SELECTED_AT", updatable = false)
    private LocalDateTime selectedAt;

    @OneToOne(mappedBy = "bestAwards", cascade = CascadeType.PERSIST)
    @JoinColumn(name = "POST_ID")
    private Posts posts;

    public BestAwards(Posts posts) {
        this.posts = posts;
        if (posts.getBestAwards() != this) {
            posts.selectedBestAwards(this);
        }
    }
}
