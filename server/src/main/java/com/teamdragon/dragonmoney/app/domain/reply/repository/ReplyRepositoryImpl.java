package com.teamdragon.dragonmoney.app.domain.reply.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;

import static com.teamdragon.dragonmoney.app.domain.reply.entity.QReply.reply;

@RequiredArgsConstructor
public class ReplyRepositoryImpl implements ReplyRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;


    @Override
    public Long updateThumbupCountPlus(Long replyId) {
        long result = queryFactory
                .update(reply)
                .set(reply.thumbupCount, reply.thumbupCount.add(1))
                .where(reply.id.eq(replyId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbupCountMinus(Long replyId) {
        long result = queryFactory
                .update(reply)
                .set(reply.thumbupCount, reply.thumbupCount.add(-1))
                .where(reply.id.eq(replyId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbdownCountPlus(Long replyId) {
        long result = queryFactory
                .update(reply)
                .set(reply.thumbdownCount, reply.thumbdownCount.add(1))
                .where(reply.id.eq(replyId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbdownCountMinus(Long replyId) {
        long result = queryFactory
                .update(reply)
                .set(reply.thumbdownCount, reply.thumbdownCount.add(-1))
                .where(reply.id.eq(replyId))
                .execute();
        em.clear();
        return result;
    }
}
