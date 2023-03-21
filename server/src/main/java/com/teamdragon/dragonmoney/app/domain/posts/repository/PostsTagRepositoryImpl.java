package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPostsTag.*;

@RequiredArgsConstructor
public class PostsTagRepositoryImpl implements PostsTagRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public void deleteAllByPostsIdAndTagName(Long postsId, List<String> tagNames) {
        queryFactory.delete(postsTag)
                .where(postsTag.posts.id.eq(postsId))
                .where(postsTag.tag.name.in(tagNames))
                .execute();
    }
}
