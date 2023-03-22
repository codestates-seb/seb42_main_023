package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.*;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.global.pagenation.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.bookmark.entity.QBookmark.*;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.*;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPostsTag.*;
import static com.teamdragon.dragonmoney.app.domain.tag.entity.QTag.*;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbdown.*;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbup.*;

@RequiredArgsConstructor
public class PostsRepositoryImpl implements PostsRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // 최신 반영 Posts 조회
    @Override
    public Posts findLatestPosts(Posts targetPosts) {
        return queryFactory
                .select(posts)
                .where(posts.id.eq(targetPosts.getId()))
                .fetchOne();
    }

    // 단일 조회 : 미로그인 시
    @Override
    public PostsDto.PostsDetailRes findPostsDetailById(Long postsId) {
        return queryFactory
                .select(Projections.constructor(PostsDto.PostsDetailRes.class, posts))
                .from(posts)
                .where(posts.id.eq(postsId))
                .fetchOne();
    }

    // 단일 조회 : 로그인 시 : 북마크 여부, 좋아요 여부, 싫어요 여부 추가
    @Override
    public PostsDto.PostsDetailRes findPostsDetailByMemberId(Long postsId, Long loginMemberId) {
        return queryFactory
                .select(Projections.constructor(PostsDto.PostsDetailRes.class,
                        posts.as("posts"),
                        ExpressionUtils.as(JPAExpressions.select(bookmark.id)
                                .from(bookmark)
                                .where(bookmark.member.id.eq(loginMemberId),
                                        bookmark.posts.id.eq(postsId))
                                .limit(1), "isBookmarked"),
                        ExpressionUtils.as(JPAExpressions.select(thumbup.id)
                                .from(thumbup)
                                .where(thumbup.parentPosts.id.eq(postsId),
                                        thumbup.member.id.eq(loginMemberId))
                                .limit(1), "isThumbup"),
                        ExpressionUtils.as(JPAExpressions.select(thumbdown.id)
                                .from(thumbdown)
                                .where(thumbdown.parentPosts.id.eq(postsId),
                                        thumbdown.member.id.eq(loginMemberId))
                                .limit(1), "isThumbdown")))
                .distinct()
                .from(posts)
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin()
                .where(posts.id.eq(postsId))
                .fetchFirst();
    }

    // Posts 목록 조회 : 페이징
    @Override
    public Page<Posts> findPostsListByPage(Pageable pageable) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        List<Posts> content = queryFactory
                .select(posts)
                .distinct()
                .from(posts)
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin()
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(posts.count())
                .distinct()
                .from(posts)
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin();

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // Posts 목록 조회 : 검색결과 + 페이징
    @Override
    public Page<Posts> findPostsListBySearch(String keyword, String[] tagNames, Pageable pageable) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        BooleanBuilder builder = new BooleanBuilder();

        // posts.title 조건 생성
        builder.and(posts.title.containsIgnoreCase(keyword));

        // tag 조건 생성
        JPQLQuery<Long> sub = JPAExpressions.select(postsTag.posts.id)
                .distinct()
                .from(postsTag)
                .join(postsTag.tag, tag)
                .where(tag.name.in(tagNames))
                .groupBy(postsTag.posts.id)
                .having(postsTag.posts.id.count().goe(tagNames.length));
        builder.and(posts.id.in(sub));

        List<Posts> content = queryFactory.selectFrom(posts)
                .distinct()
                .where(builder)
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory.select(posts.count())
                .from(posts)
                .where(builder);

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // Posts 목록 조회 : 유저이름 + 페이징
    @Override
    public Page<Posts> findPostsListByMemberName(String memberName, Pageable pageable) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        List<Posts> content = queryFactory
                .selectFrom(posts)
                .distinct()
                .leftJoin(posts.postsTags, postsTag)
                .leftJoin(postsTag.tag, tag)
                .where(posts.writer.name.eq(memberName))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(posts.count())
                .from(posts)
                .where(posts.writer.name.eq(memberName));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // 조회수 증가
    @Override
    public void plusViewCountById(Long postsId) {
        queryFactory.update(posts)
                .set(posts.viewCount, posts.viewCount.add(1))
                .where(posts.id.eq(postsId))
                .execute();
    }

    private OrderSpecifier[] getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, path);
        return orders.toArray(OrderSpecifier[]::new);
    }
}
