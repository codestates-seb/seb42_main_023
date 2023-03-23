package com.teamdragon.dragonmoney.app.domain.reply.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.QComment;
import com.teamdragon.dragonmoney.app.domain.reply.dto.ReplyDto;
import com.teamdragon.dragonmoney.app.domain.reply.entity.QReply;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.global.pagenation.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.comment.entity.QComment.comment;
import static com.teamdragon.dragonmoney.app.domain.member.entity.QMember.member;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.posts;
import static com.teamdragon.dragonmoney.app.domain.reply.entity.QReply.reply;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbdown.thumbdown;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbup.thumbup;

@RequiredArgsConstructor
public class ReplyRepositoryImpl implements ReplyRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ReplyDto.ReplyListElement> findReplyListByPage(Pageable pageable, Long commentId) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, reply);
        List<ReplyDto.ReplyListElement> content = queryFactory
                .select(Projections.constructor(ReplyDto.ReplyListElement.class,
                        comment.id.as("commentId"),
                        reply.as("comment"),
                        reply.writer.name.as("memberName"),
                        reply.writer.profileImage.as("memberImage"),
                        reply.state.as("replyState"))
                )
                .distinct()
                .from(reply)
                .leftJoin(reply.writer, member)
                .leftJoin(reply.comment, comment)
                .where(reply.state.eq(Reply.State.ACTIVE))
                .where(reply.comment.id.eq(commentId))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(reply.count())
                .distinct()
                .from(reply)
                .where(reply.state.eq(Reply.State.ACTIVE))
                .where(reply.comment.id.eq(commentId));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    @Override
    public Page<ReplyDto.ReplyListElement> findReplyListByPageAndMemberId(Pageable pageable, Long commentId, Long loginMemberId) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, reply);
        List<ReplyDto.ReplyListElement> content = queryFactory
                .select(Projections.constructor(ReplyDto.ReplyListElement.class,
                        comment.id.as("commentId"),
                        reply.as("comment"),
                        reply.writer.name.as("memberName"),
                        reply.writer.profileImage.as("memberImage"),
                        reply.state.as("replyState"),
                        ExpressionUtils.as(JPAExpressions.select(thumbup.id.max())
                                .from(thumbup)
                                .where(thumbup.parentReply.id.eq(reply.id),
                                        thumbup.member.id.eq(loginMemberId),
                                        thumbup.parentReply.state.eq(Reply.State.ACTIVE)),"isThumbup"),
                        ExpressionUtils.as(JPAExpressions.select(thumbdown.id.max())
                                .from(thumbdown)
                                .where(thumbdown.parentReply.id.eq(reply.id),
                                        thumbdown.member.id.eq(loginMemberId),
                                        thumbdown.parentReply.state.eq(Reply.State.ACTIVE)),"isThumbdown"))
                )
                .distinct()
                .from(reply)
                .leftJoin(reply.writer, member)
                .leftJoin(reply.comment, comment)
                .where(reply.state.eq(Reply.State.ACTIVE))
                .where(reply.comment.id.eq(commentId))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(reply.count())
                .distinct()
                .from(reply)
                .where(reply.state.eq(Reply.State.ACTIVE))
                .where(reply.comment.id.eq(commentId));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private OrderSpecifier[] getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, path);
        return orders.toArray(OrderSpecifier[]::new);
    }
}
