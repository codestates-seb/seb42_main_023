package com.teamdragon.dragonmoney.app.global.auth.refresh.entity;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "refreshToken", fetch = FetchType.LAZY)
    private Member member;

    @Column
    private String refreshTokenValue;

    @Builder
    public RefreshToken(Long id, Member member, String refreshTokenValue) {
        this.id = id;
        this.member = member;
        this.refreshTokenValue = refreshTokenValue;
    }
}
