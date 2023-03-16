package com.teamdragon.dragonmoney.app.domain.tag.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.post.entity.QPostTag;
import com.teamdragon.dragonmoney.app.domain.tag.entity.QTag;
import lombok.RequiredArgsConstructor;

import static com.teamdragon.dragonmoney.app.domain.post.entity.QPostTag.*;
import static com.teamdragon.dragonmoney.app.domain.tag.entity.QTag.*;

@RequiredArgsConstructor
public class TagRepositoryImpl implements TagRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // 태그 삭제 : 참조되는곳이 없는 태그들 삭제
    @Override
    public void deleteOrphanTag() {
        QTag tag2 = new QTag("tag2");

        queryFactory
                .delete(tag2)
                .where(tag2.id.in(
                        JPAExpressions
                                .select(tag.id)
                                .from(tag)
                                .leftJoin(postTag)
                                .on(tag.id.eq(postTag.tag.id))
                                .where(postTag.post.isNull())
                ))
                .execute();
    }
}
