package com.teamdragon.dragonmoney.app.domain.category.entity;

import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;

import javax.persistence.*;

@Entity
public class Category extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String content;
}
