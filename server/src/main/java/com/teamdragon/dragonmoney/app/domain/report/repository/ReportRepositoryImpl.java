package com.teamdragon.dragonmoney.app.domain.report.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import com.teamdragon.dragonmoney.app.global.pagenation.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.comment.entity.QComment.comment;
import static com.teamdragon.dragonmoney.app.domain.member.entity.QMember.member;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.posts;
import static com.teamdragon.dragonmoney.app.domain.reply.entity.QReply.reply;
import static com.teamdragon.dragonmoney.app.domain.report.entity.QReport.report;

@RequiredArgsConstructor
public class ReportRepositoryImpl implements ReportRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public String findReportPostsWriter(Long reportId) {
        return queryFactory
                .select(member.name)
                .from(report)
                .join(report.targetPosts, posts)
                .join(posts.writer, member)
                .where(report.id.eq(reportId))
                .fetchOne();
    }

    @Override
    public String findReportCommentWriter (Long reportId) {
        return queryFactory
                .select(member.name)
                .from(report)
                .join(report.targetComment, comment)
                .join(comment.writer, member)
                .where(report.id.eq(reportId))
                .fetchOne();
    }

    @Override
    public String findReportReplyWriter(Long reportId) {
        return queryFactory
                .select(member.name)
                .from(report)
                .join(report.targetReply, reply)
                .join(reply.comment, comment)
                .join(comment.writer, member)
                .where(report.id.eq(reportId))
                .fetchOne();
    }

    // 신고글 목록 조회
    @Override
    public Page<Report> findReportListByHandledState(String orderby, Report.State handledState, Pageable pageable) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, report);

        // 게시글 정렬
        if(orderby.equals("post")) {
        List<Report> content = queryFactory
                .selectFrom(report)
                .distinct()
                .join(report.targetPosts, posts)
                .where(report.handleState.eq(handledState), report.targetPosts.isNotNull())
                .where(postByHandledState(handledState))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(report.count())
                .from(report)
                .where(report.handleState.eq(handledState))
                .where(report.targetPosts.isNotNull());
            return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
        }
        // 댓글 정렬
        else if (orderby.equals("comment")) {
            List<Report> content = queryFactory
                    .selectFrom(report)
                    .distinct()
                    .join(report.targetComment, comment)
                    .where(report.handleState.eq(handledState), report.targetComment.isNotNull())
                    .where(commentByHandledState(handledState))
                    .orderBy(orders)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();
            JPAQuery<Long> countQuery = queryFactory
                    .select(report.count())
                    .from(report)
                    .where(report.handleState.eq(handledState))
                    .where(report.targetComment.isNotNull());
            return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
        }
        // 답글 정렬
        else if (orderby.equals("reply")) {
            List<Report> content = queryFactory
                    .selectFrom(report)
                    .distinct()
                    .join(report.targetReply, reply)
                    .where(report.handleState.eq(handledState), report.targetReply.isNotNull())
                    .where(replyByHandledState(handledState))
                    .orderBy(orders)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();
            JPAQuery<Long> countQuery = queryFactory
                    .select(report.count())
                    .from(report)
                    .where(report.handleState.eq(handledState))
                    .where(report.targetReply.isNotNull());
            return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
        }
        // 모두 가져오기
        else if (orderby.equals("all") && handledState.equals(Report.State.STANDBY)) {
            List<Report> content = queryFactory
                    .selectFrom(report)
                    .distinct()
                    .leftJoin(report.targetPosts, posts).fetchJoin()
                    .leftJoin(report.targetComment, comment).fetchJoin()
                    .leftJoin(report.targetReply, reply).fetchJoin()
                    .where(report.handleState.eq(handledState))
                    .where(report.targetPosts.state.eq(Posts.State.ACTIVE)
                            .or(report.targetComment.state.eq(Comment.State.ACTIVE))
                                    .or(report.targetReply.state.eq(Reply.State.ACTIVE)))
                    .orderBy(orders)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();
            JPAQuery<Long> countQuery = queryFactory
                    .select(report.count())
                    .from(report)
                    .where(report.handleState.eq(handledState));
            return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
        } else if (orderby.equals("all") && handledState.equals(Report.State.DELETED)) {
            List<Report> content = queryFactory
                    .selectFrom(report)
                    .distinct()
                    .where(report.handleState.eq(handledState))
                    .orderBy(orders)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();
            JPAQuery<Long> countQuery = queryFactory
                    .select(report.count())
                    .from(report)
                    .where(report.handleState.eq(handledState));
            return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
        }
        return null;
    }

    private BooleanExpression postByHandledState(Report.State handledState) {
        if (handledState.equals(Report.State.STANDBY)) {
            return posts.state.eq(Posts.State.ACTIVE);
        }
        return null;
    }

    private BooleanExpression commentByHandledState(Report.State handledState) {
        if (handledState.equals(Report.State.STANDBY)) {
            return comment.state.eq(Comment.State.ACTIVE);
        }
        return null;
    }

    private BooleanExpression replyByHandledState(Report.State handledState) {
        if (handledState.equals(Report.State.STANDBY)) {
            return reply.state.eq(Reply.State.ACTIVE);
        }
        return null;
    }

    private OrderSpecifier[] getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, path);
        return orders.toArray(OrderSpecifier[]::new);
    }
}
