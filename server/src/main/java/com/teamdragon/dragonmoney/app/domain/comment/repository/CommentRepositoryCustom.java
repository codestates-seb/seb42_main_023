package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;

public interface CommentRepositoryCustom {
    Long updateThumbupCountPlus(Long commentId);
    Long updateThumbupCountMinus(Long commentId);
    Long updateThumbdownCountPlus(Long commentId);
    Long updateThumbdownCountMinus(Long commentId);
}
