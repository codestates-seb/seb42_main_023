package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPostsTag.*;
import static com.teamdragon.dragonmoney.app.domain.tag.entity.QTag.*;

@Transactional
@RequiredArgsConstructor
public class PostsTagRepositoryImpl implements PostsTagRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public void deleteAllByPostsIdAndTagName(Long postsId, List<String> tagNames) {
        queryFactory.delete(postsTag)
                .where(postsTag.posts.id.eq(postsId), postsTag.tag.id.in(
                        JPAExpressions.select(tag.id)
                                .from(tag)
                                .where(tag.name.in(tagNames))
                ))
                .execute();
    }
}
