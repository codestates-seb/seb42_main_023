package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;

import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.posts;

@RequiredArgsConstructor
public class PostsRepositoryImpl implements PostsRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public Long updateThumbupCountPlus(Long postsId) {
        long result = queryFactory
                .update(posts)
                .set(posts.thumbupCount, posts.thumbupCount.add(1))
                .where(posts.id.eq(postsId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbupCountMinus(Long postsId) {
        long result = queryFactory
                .update(posts)
                .set(posts.thumbupCount, posts.thumbupCount.add(-1))
                .where(posts.id.eq(postsId))
                .execute();

        em.clear();
        return result;    }

    @Override
    public Long updateThumbdownCountPlus(Long postsId) {
        long result = queryFactory
                .update(posts)
                .set(posts.thumbdownCount, posts.thumbdownCount.add(1))
                .where(posts.id.eq(postsId))
                .execute();
        em.clear();
        return result;
    }

    @Override
    public Long updateThumbdownCountMinus(Long postsId) {
        long result = queryFactory
                .update(posts)
                .set(posts.thumbdownCount, posts.thumbdownCount.add(-1))
                .where(posts.id.eq(postsId))
                .execute();
        em.clear();
        return result;
    }
}
