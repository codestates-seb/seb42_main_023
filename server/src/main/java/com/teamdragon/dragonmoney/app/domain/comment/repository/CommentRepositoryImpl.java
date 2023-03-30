package com.teamdragon.dragonmoney.app.domain.comment.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.global.pagenation.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.comment.entity.QComment.*;
import static com.teamdragon.dragonmoney.app.domain.member.entity.QMember.*;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.*;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbdown.thumbdown;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbup.thumbup;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<CommentDto.CommentListElement> findCommentListByPage(Pageable pageable, Long postsId) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, comment);
        List<CommentDto.CommentListElement> content = queryFactory
                .select(Projections.constructor(CommentDto.CommentListElement.class,
                        posts.id.as("postsId"),
                        comment.as("comment"),
                        comment.writer.name.as("memberName"),
                        comment.writer.profileImage.as("memberImage"),
                        comment.state.as("commentState"))
                )
                .distinct()
                .from(comment)
                .leftJoin(comment.writer, member)
                .leftJoin(comment.posts, posts)
                .where(comment.posts.id.eq(postsId))
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
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, comment);
        List<CommentDto.CommentListElement> content = queryFactory
                .select(Projections.constructor(CommentDto.CommentListElement.class,
                        posts.id.as("postsId"),
                        comment.as("comment"),
                        comment.writer.name.as("memberName"),
                        comment.writer.profileImage.as("memberImage"),
                        comment.state.as("commentState"),
                        ExpressionUtils.as(JPAExpressions.select(thumbup.id.max())
                                .from(thumbup)
                                .where(thumbup.parentComment.id.eq(comment.id),
                                        thumbup.member.id.eq(loginMemberId),
                                        thumbup.parentComment.state.eq(Comment.State.ACTIVE)), "isThumbup"),
                        ExpressionUtils.as(JPAExpressions.select(thumbdown.id.max())
                                .from(thumbdown)
                                .where(thumbdown.parentComment.id.eq(comment.id),
                                        thumbdown.member.id.eq(loginMemberId),
                                        thumbdown.parentComment.state.eq(Comment.State.ACTIVE)), "isThumbdown")
                        )
                )
                .distinct()
                .from(comment)
                .leftJoin(comment.writer, member)
                .leftJoin(comment.posts, posts)
                .where(comment.posts.id.eq(postsId))
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

    // 특정 회원이 쓴 댓글 목록 조회
    @Override
    public Page<Comment> findCommentListByMemberName (Pageable pageable, String memberName) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, comment);

        List<Comment> content = queryFactory
                .selectFrom(comment).distinct()
                .where(comment.state.notIn(Comment.State.DELETED), comment.writer.name.eq(memberName))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(comment.count())
                .from(comment)
                .where(comment.state.notIn(Comment.State.DELETED), comment.writer.name.eq(memberName));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // Comment 목록 조회 : 마이 페이지 좋아요 한 댓글 + 페이징
    @Override
    public Page<Comment> findThumbUpCommentListByMemberName(Pageable pageable, String memberName) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, comment);

        List<Comment> content = queryFactory
                .select(comment).distinct()
                .from(thumbup)
                .leftJoin(thumbup.parentComment, comment)
                .leftJoin(thumbup.member, member)
                .where(comment.state.notIn(Comment.State.DELETED), thumbup.member.name.eq(memberName))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(comment.count())
                .from(comment)
                .where(comment.state.notIn(Comment.State.DELETED), comment.writer.name.eq(memberName));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // 회원 탈퇴 시 작성한 게시글 조회
    @Override
    public List<Comment> findCommentByDeletedMember(String memberName) {
        return queryFactory
                .select(comment).distinct()
                .from(comment)
                .leftJoin(comment.writer, member).fetchJoin()
                .where(comment.state.eq(Comment.State.ACTIVE), comment.writer.name.eq(memberName))
                .fetch();
    }

    // 특정 회원이 쓴 댓글 개수 조회
    @Override
    public Long findMemberCommentCount(String memberName) {
        Long memberCommentCount = queryFactory
                .select(comment.count())
                .from(comment)
                .where(comment.state.notIn(Comment.State.DELETED), comment.writer.name.eq(memberName))
                .fetchOne();
        return memberCommentCount;
    }

    // 특정 회원이 좋아요 한 댓글 개수 조회
    @Override
    public Long findMemberThumbUpCommentCount(String memberName) {
        Long memberPostsCount = queryFactory
                .select(thumbup.count())
                .from(thumbup)
                .join(thumbup.parentComment, comment)
                .where(comment.state.notIn(Comment.State.DELETED), thumbup.member.name.eq(memberName), thumbup.parentComment.id.isNotNull())
                .fetchOne();
        return memberPostsCount;
    }

    private OrderSpecifier[] getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, path);
        return orders.toArray(OrderSpecifier[]::new);
    }
}
