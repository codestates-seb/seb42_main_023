package com.teamdragon.dragonmoney.app.domain.member.entity;

import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.global.auth.refresh.entity.RefreshToken;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean nameDuplicateCheck;

    @Column(name = "PROFILE_IMAGE", nullable = false, length = 300)
    private String profileImage;

    @Column(length = 1700)
    private String intro;

    @Column(length = 150, unique = true)
    private String tempName;

    @Column
    private String tempAccessToken;

    @Email
    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 30, unique = true)
    private String name;

    @Column(length = 20, name = "OAUTH_KIND")
    private String oauthkind;

    @Column(length = 40)
    @Enumerated(value = EnumType.STRING)
    private MemberState state;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> roles = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REFRESH_TOKEN_ID")
    private RefreshToken refreshToken;

    @Builder
    public Member(Long id, Boolean nameDuplicateCheck, String profileImage,
                  String intro, String tempName, String tempAccessToken,
                  String email, String name, String oauthkind, MemberState state,
                  DeleteResult deleteResult, List<String> roles) {
        this.id = id;
        this.nameDuplicateCheck = nameDuplicateCheck;
        this.profileImage = profileImage;
        this.intro = intro;
        this.tempName = tempName;
        this.tempAccessToken = tempAccessToken;
        this.email = email;
        this.name = name;
        this.oauthkind = oauthkind;
        this.state = state;
        this.deleteResult = deleteResult;
        this.roles = roles;
    }

    public enum MemberState {
        ACTIVE("활성"),
        DELETED("탈퇴");

        @Getter
        private String state;

        MemberState(String state) {
            this.state = state;
        }
    }

    public void saveMemberName(String memberName, Boolean nameDuplicateCheck) {
        this.name = memberName;
        this.nameDuplicateCheck = nameDuplicateCheck;
    }

    public void saveTempAccessToken(String tempAccessToken) {
        this.tempAccessToken = tempAccessToken;
    }

    public void changedMemberState(MemberState memberState) {
        this.state = memberState;
    }

    public void saveRefreshToken(RefreshToken refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updatedMemberIntro(String intro) {
        this.intro = intro;
    }

    public void deletedMemberChangedState(DeleteResult deleteResult) {
        this.state = MemberState.DELETED;
        this.deleteResult = deleteResult;
    }
}