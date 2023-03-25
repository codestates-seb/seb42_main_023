package com.teamdragon.dragonmoney.app.global.auth.refresh.entity;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import lombok.AllArgsConstructor;
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
    @Column(name = "REFRESH_TOKEN_ID")
    private Long refreshTokenId;

    @OneToOne(mappedBy = "refreshToken", fetch = FetchType.LAZY)
    private Member member;

    @Column
    private String refreshTokenValue;

    @Builder
    public RefreshToken(Long refreshTokenId, Member member, String refreshTokenValue) {
        this.refreshTokenId = refreshTokenId;
        this.member = member;
        this.refreshTokenValue = refreshTokenValue;
    }
}
