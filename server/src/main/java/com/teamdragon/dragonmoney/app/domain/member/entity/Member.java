package com.teamdragon.dragonmoney.app.domain.member.entity;

import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;
import com.teamdragon.dragonmoney.app.global.entity.DeleteResult;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Setter
    private Boolean nameDuplicateCheck;

    @Column(name = "PROFILE_IMAGE", nullable = false, length = 300)
    private String profileImage;

    @Column(length = 1700)
    @Setter
    private String intro;

    @Column
    private String tempName;

    @Column
    @Setter
    private String tempAccessToken;

    @Email
    @Column(length = 100, nullable = false)
    private String email;

    @Setter
    @Column(length = 30, nullable = false)
    private String name;

    @Column(length = 10, name = "OAUTH_KIND")
    private String oauthkind;

    @Column(length = 20)
    @Enumerated(value = EnumType.STRING)
    private MemberState state;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @Builder
    public Member(Long id, Boolean nameDuplicateCheck, String profileImage, String intro, String email,
                  String name, String oauthkind, MemberState state) {
        this.id = id;
        this.nameDuplicateCheck = nameDuplicateCheck;
        this.profileImage = profileImage;
        this.intro = intro;
        this.email = email;
        this.name = name;
        this.oauthkind = oauthkind;
        this.state = state;
    }

    public static enum MemberState {
        ACTIVE("활성"),
        DELETED("탈퇴");

        @Getter
        private String state;

        MemberState(String state) {
            this.state = state;
        }
    }
}