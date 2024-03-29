package com.teamdragon.dragonmoney.app.domain.member.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import lombok.RequiredArgsConstructor;

import static com.teamdragon.dragonmoney.app.domain.bookmark.entity.QBookmark.bookmark;
import static com.teamdragon.dragonmoney.app.domain.comment.entity.QComment.comment;
import static com.teamdragon.dragonmoney.app.domain.member.entity.QMember.member;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.posts;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumb.*;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public MyPageDto.MyPageCount findCount(String memberName) {
        return queryFactory
                .select(Projections.constructor(MyPageDto.MyPageCount.class,
                        ExpressionUtils.as(JPAExpressions.select(posts.count())
                                .from(posts)
                                .where(posts.state.notIn(Posts.State.DELETED),
                                        posts.writer.name.eq(memberName)),"postCount"),
                        ExpressionUtils.as(JPAExpressions.select(comment.count())
                                .from(comment)
                                .where(comment.state.notIn(Comment.State.DELETED),
                                        comment.writer.name.eq(memberName)), "commentCount"),
                        ExpressionUtils.as(JPAExpressions.select(thumb.count())
                                .from(thumb)
                                .join(thumb.parentPosts, posts)
                                .where(posts.state.notIn(Posts.State.DELETED),
                                        thumb.member.name.eq(memberName),
                                        thumb.thumbType.eq(Thumb.Type.UP),
                                        thumb.parentPosts.id.isNotNull()), "thumbupPostCount"),
                        ExpressionUtils.as(JPAExpressions.select(thumb.count())
                                .from(thumb)
                                .join(thumb.parentComment, comment)
                                .where(comment.state.notIn(Comment.State.DELETED),
                                        thumb.member.name.eq(memberName),
                                        thumb.thumbType.eq(Thumb.Type.UP),
                                        thumb.parentComment.id.isNotNull()), "thumbupCommentCount"),
                        ExpressionUtils.as(JPAExpressions.select(posts.count())
                                .from(bookmark)
                                .join(bookmark.posts, posts)
                                .where(posts.state.notIn(Posts.State.DELETED),
                                        bookmark.member.name.eq(memberName)), "bookmarkCount")))
                .distinct()
                .from(member)
                .fetchFirst();
    }
}
