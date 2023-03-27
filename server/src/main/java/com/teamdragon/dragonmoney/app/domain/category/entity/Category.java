package com.teamdragon.dragonmoney.app.domain.category.entity;

import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
public class Category extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30)
    private String title;

    @Column(length = 200)
    private String content;

    @Builder
    public Category(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
