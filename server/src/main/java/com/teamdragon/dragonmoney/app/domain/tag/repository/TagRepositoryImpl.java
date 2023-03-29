package com.teamdragon.dragonmoney.app.domain.tag.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.posts.entity.QPostsTag;
import com.teamdragon.dragonmoney.app.domain.tag.entity.QTag;
import lombok.RequiredArgsConstructor;

import static com.teamdragon.dragonmoney.app.domain.tag.entity.QTag.*;

@RequiredArgsConstructor
public class TagRepositoryImpl implements TagRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // 태그 삭제 : 참조되는곳이 없는 태그들 삭제
    @Override
    public void deleteOrphanTag() {

        queryFactory
                .delete(tag)
                .where(tag.id.notIn(
                        JPAExpressions
                                .select(QPostsTag.postsTag.tag.id)
                                .from(QPostsTag.postsTag)
                                .groupBy(QPostsTag.postsTag.tag.id)
                ))
                .execute();
    }
}
