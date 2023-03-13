package com.teamdragon.dragonmoney.app.global.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "DELETE_RESULT")
@Getter
@Builder
@AllArgsConstructor
public class DeleteResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DELETED_AT")
    @CreatedDate
    private LocalDateTime deletedAt;

    @Column(name = "DELETE_REASON")
    private String deleteReason;
}
