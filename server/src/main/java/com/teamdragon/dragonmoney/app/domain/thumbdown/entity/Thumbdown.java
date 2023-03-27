package com.teamdragon.dragonmoney.app.domain.thumbdown.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Thumbdown {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
