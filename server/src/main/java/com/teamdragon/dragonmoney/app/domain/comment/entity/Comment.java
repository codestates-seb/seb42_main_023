package com.teamdragon.dragonmoney.app.domain.comment.entity;

import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountable;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Comment implements ThumbCountable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long thumbupCount;

    @Column
    private Long thumbdownCount;

    @Override
    public Thumb getThumbCount() {
        return new Thumb(this.thumbupCount, this.thumbdownCount);
    }
}
