package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long>, CommentRepositoryCustom {
}
