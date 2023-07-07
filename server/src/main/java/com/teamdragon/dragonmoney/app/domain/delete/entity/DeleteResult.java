package com.teamdragon.dragonmoney.app.domain.delete.entity;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class DeleteResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column
    private LocalDateTime deletedAt;

    @Column(length = 100)
    @Enumerated(value = EnumType.STRING)
    private Reason deleteReason;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "deleteResult")
    private List<Posts> posts;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "deleteResult")
    private List<Comment> comment;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "deleteResult")
    private List<Reply> reply;

    @Builder
    public DeleteResult(Reason deleteReason) {
        this.deleteReason = deleteReason;
    }

    @Getter
    public enum Reason {
        SELF_DELETED("작성자 본인에 의한 삭제"),
        DELETED_BY_REPORT("신고에 의한 삭제"),
        DELETED_BY_PARENT("상위객체 삭제로 인한 삭제"),
        DELETED_BY_MEMBER_REMOVE("회원 탈퇴로 인한 삭제");

        private String reason;

        Reason(String reason) {
            this.reason = reason;
        }
    }
}
