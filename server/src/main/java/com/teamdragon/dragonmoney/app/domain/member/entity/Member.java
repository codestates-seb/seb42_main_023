package com.teamdragon.dragonmoney.app.domain.member.entity;

import com.teamdragon.dragonmoney.app.global.audit.BaseTimeEntity;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
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
    @Column(length = 30)
    private String name;

    @Column(length = 10, name = "OAUTH_KIND")
    private String oauthkind;

    @Column(length = 20)
    @Enumerated(value = EnumType.STRING)
    private MemberState state;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> memberRoles = new ArrayList<>();

    @Builder
    public Member(Long id, Boolean nameDuplicateCheck, String profileImage,
                  String intro, String tempName, String tempAccessToken,
                  String email, String name, String oauthkind, MemberState state,
                  DeleteResult deleteResult, List<String> memberRoles) {
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
        this.memberRoles = memberRoles;
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