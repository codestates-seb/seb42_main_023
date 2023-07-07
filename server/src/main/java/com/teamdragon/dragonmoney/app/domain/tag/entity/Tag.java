package com.teamdragon.dragonmoney.app.domain.tag.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 80, unique = true)
    private String name;

    // 매퍼 변환용
    @Builder
    public Tag(String name) {
        this.name = name;
    }
}
