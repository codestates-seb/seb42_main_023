package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;

import static com.teamdragon.dragonmoney.app.domain.comment.entity.QComment.*;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public Long updateThumbupCountPlus(Long commentId) {
        long result = queryFactory
                .update(comment)
                .set(comment.thumbupCount, comment.thumbupCount.add(1))
                .where(comment.id.eq(commentId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbupCountMinus(Long commentId) {
        long result = queryFactory
                .update(comment)
                .set(comment.thumbupCount, comment.thumbupCount.add(-1))
                .where(comment.id.eq(commentId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbdownCountPlus(Long commentId) {
        long result = queryFactory
                .update(comment)
                .set(comment.thumbdownCount, comment.thumbdownCount.add(1))
                .where(comment.id.eq(commentId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbdownCountMinus(Long commentId) {
        long result = queryFactory
                .update(comment)
                .set(comment.thumbdownCount, comment.thumbdownCount.add(-1))
                .where(comment.id.eq(commentId))
                .execute();
        em.clear();
        return result;
    }
}
