package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.QComment;
import com.teamdragon.dragonmoney.app.global.pagenation.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.comment.entity.QComment.*;
import static com.teamdragon.dragonmoney.app.domain.member.entity.QMember.*;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.*;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbdown.thumbdown;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbup.thumbup;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public Page<CommentDto.CommentListElement> findCommentListByPage(Pageable pageable, Long postsId) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);
        List<CommentDto.CommentListElement> content = queryFactory
                .select(Projections.constructor(CommentDto.CommentListElement.class,
                        posts.id.as("postsId"),
                        QComment.comment.as("comment"),
                        QComment.comment.writer.name.as("memberName"),
                        QComment.comment.writer.name.as("memberImage"))
                )
                .distinct()
                .from(QComment.comment)
                .leftJoin(QComment.comment.writer, member).fetchJoin()
                .leftJoin(QComment.comment.posts, posts).fetchJoin()
                .where(QComment.comment.posts.id.eq(postsId))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(comment.count())
                .distinct()
                .from(comment)
                .where(comment.posts.id.eq(postsId));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    @Override
    public Page<CommentDto.CommentListElement> findCommentListByPageAndMemberId(Pageable pageable, Long postsId, Long loginMemberId) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);
        List<CommentDto.CommentListElement> content = queryFactory
                .select(Projections.constructor(CommentDto.CommentListElement.class,
                        posts.id.as("postsId"),
                        QComment.comment.as("comment"),
                        QComment.comment.writer.name.as("memberName"),
                        QComment.comment.writer.name.as("memberImage"),
                        ExpressionUtils.as(JPAExpressions.select(thumbup.id)
                                .from(thumbup)
                                .where(thumbup.parentComment.id.eq(QComment.comment.id),
                                        thumbup.member.id.eq(loginMemberId))
                                .limit(1), "isThumbup"),
                        ExpressionUtils.as(JPAExpressions.select(thumbdown.id)
                                .from(thumbdown)
                                .where(thumbdown.parentComment.id.eq(QComment.comment.id),
                                        thumbdown.member.id.eq(loginMemberId))
                                .limit(1), "isThumbdown")
                        )
                )
                .distinct()
                .from(QComment.comment)
                .leftJoin(QComment.comment.writer, member).fetchJoin()
                .leftJoin(QComment.comment.posts, posts).fetchJoin()
                .where(QComment.comment.posts.id.eq(postsId))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(comment.count())
                .distinct()
                .from(comment)
                .where(comment.posts.id.eq(postsId));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

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

    private OrderSpecifier[] getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, path);
        return orders.toArray(OrderSpecifier[]::new);
    }
}
