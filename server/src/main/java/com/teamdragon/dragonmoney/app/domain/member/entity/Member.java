package com.teamdragon.dragonmoney.app.domain.member.entity;

import com.teamdragon.dragonmoney.app.global.audit.Auditable;
import com.teamdragon.dragonmoney.app.global.entity.DeleteResult;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private String uuid = UUID.randomUUID().toString();

    @Column
    private Boolean nameDuplicateCheck;

    @Column(name = "PROFILE_IMAGE", nullable = false)
    private String profileImage;

    @Column(length = 200)
    private String intro;

    @Email
    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 30, nullable = false)
    private String name;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column
    private LocalDateTime modifiedAt;

    @Column(length = 10, name = "OAUTH_KIND")
    private String oAuthKind;

    @Column(length = 20)
    @Enumerated(value = EnumType.STRING)
    private MemberState state;

    @ManyToOne
    @JoinColumn(name = "DELETE_RESULT_ID")
    private DeleteResult deleteResult;

    @Builder
    public Member(Long id, String uuid, Boolean nameDuplicateCheck, String profileImage, String intro, String email,
                  String name, LocalDateTime createdAt, LocalDateTime modifiedAt,
                  String oAuthKind, MemberState state) {
        this.id = id;
        this.uuid = uuid;
        this.nameDuplicateCheck = nameDuplicateCheck;
        this.profileImage = profileImage;
        this.intro = intro;
        this.email = email;
        this.name = name;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.oAuthKind = oAuthKind;
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
