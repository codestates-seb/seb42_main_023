package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.*;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.popular.entity.QBestAwards;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.global.pagenation.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.bookmark.entity.QBookmark.*;
import static com.teamdragon.dragonmoney.app.domain.member.entity.QMember.member;
import static com.teamdragon.dragonmoney.app.domain.popular.entity.QBestAwards.*;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPosts.*;
import static com.teamdragon.dragonmoney.app.domain.posts.entity.QPostsTag.*;
import static com.teamdragon.dragonmoney.app.domain.tag.entity.QTag.*;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbdown.*;
import static com.teamdragon.dragonmoney.app.domain.thumb.entity.QThumbup.*;

@RequiredArgsConstructor
public class PostsRepositoryImpl implements PostsRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager entityManager;

    // 주간 인기 게시물 목록 조회
    @Override
    public List<Posts> findWeeklyPopularList(int size, LocalDateTime from, LocalDateTime to) {
        return queryFactory
                .select(posts).distinct()
                .from(posts)
                .leftJoin(posts.writer, member).fetchJoin()
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin()
                .where(posts.state.eq(Posts.State.ACTIVE), posts.createdAt.between(from, to))
                .orderBy(
                        posts.viewCount.add(
                            posts.commentCount.add(
                                    posts.thumbupCount.add(
                                            posts.bookmarkCount
                                    )
                            )
                        ).desc()
                )
                .limit(size)
                .fetch();
    }

    // 명예의 전당 목록 조회
    @Override
    public Page<Posts> findBestAwardsListByPage(Pageable pageable) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        List<Posts> content = queryFactory
                .select(posts).distinct()
                .from(posts)
                .leftJoin(posts.writer, member).fetchJoin()
                .leftJoin(posts.bestAwards, bestAwards).fetchJoin()
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin()
                .where(posts.state.eq(Posts.State.ACTIVE), posts.bestAwards.isNotNull())
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(posts.count()).distinct()
                .from(posts)
                .leftJoin(posts.bestAwards, bestAwards)
                .where(posts.state.eq(Posts.State.ACTIVE), posts.bestAwards.isNotNull());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // 추천 게시물 목록 조회
    @Override
    public List<Posts> findRecommendPostsList(int size) {
        TypedQuery<Posts> query
                = entityManager.createQuery(
                        "SELECT p FROM Posts p WHERE p.state = :state AND p.bestAwards IS NOT NULL ORDER BY FUNCTION('RAND')",
                        Posts.class)
                .setParameter("state", Posts.State.ACTIVE)
                .setMaxResults(size);

        return query.getResultList();
    }

    // 단일 조회 : 미로그인 시
    @Override
    public PostsDto.PostsDetailRes findPostsDetailById(Long postsId) {
        return queryFactory
                .select(Projections.constructor(PostsDto.PostsDetailRes.class, posts))
                .from(posts)
                .where(posts.state.eq(Posts.State.ACTIVE), posts.id.eq(postsId))
                .fetchOne();
    }

    // 단일 조회 : 로그인 시 : 북마크 여부, 좋아요 여부, 싫어요 여부 추가
    @Override
    public PostsDto.PostsDetailRes findPostsDetailByMemberId(Long postsId, Long loginMemberId) {
        return queryFactory
                .select(Projections.constructor(PostsDto.PostsDetailRes.class,
                        posts.as("posts"),
                        ExpressionUtils.as(JPAExpressions.select(bookmark.id.max())
                                .from(bookmark)
                                .where(bookmark.member.id.eq(loginMemberId),
                                        bookmark.posts.id.eq(postsId),
                                        bookmark.posts.state.eq(Posts.State.ACTIVE)), "isBookmarked"),
                        ExpressionUtils.as(JPAExpressions.select(thumbup.id.max())
                                .from(thumbup)
                                .where(thumbup.parentPosts.id.eq(postsId),
                                        thumbup.member.id.eq(loginMemberId),
                                        thumbup.parentPosts.state.eq(Posts.State.ACTIVE)), "isThumbup"),
                        ExpressionUtils.as(JPAExpressions.select(thumbdown.id.max())
                                .from(thumbdown)
                                .where(thumbdown.parentPosts.id.eq(postsId),
                                        thumbdown.member.id.eq(loginMemberId),
                                        thumbdown.parentPosts.state.eq(Posts.State.ACTIVE)), "isThumbdown")))
                .distinct()
                .from(posts)
                .leftJoin(posts.postsTags, postsTag)
                .leftJoin(postsTag.tag, tag)
                .where(posts.state.eq(Posts.State.ACTIVE), posts.id.eq(postsId))
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
                .leftJoin(posts.writer, member).fetchJoin()
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin()
                .where(posts.state.eq(Posts.State.ACTIVE))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(posts.count())
                .distinct()
                .from(posts)
                .where(posts.state.eq(Posts.State.ACTIVE));

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
                .join(postsTag.posts, posts).fetchJoin()
                .where(tag.name.in(tagNames))
                .groupBy(postsTag.posts.id)
                .having(postsTag.posts.id.count().goe(tagNames.length));

        // tag 조건 생성
        builder.and(posts.id.in(sub));

        List<Posts> content = queryFactory.selectFrom(posts).distinct()
                .leftJoin(posts.writer, member).fetchJoin()
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin()
                .where(posts.state.eq(Posts.State.ACTIVE), builder)
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory.select(posts.count())
                .from(posts)
                .where(posts.state.eq(Posts.State.ACTIVE), builder);

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // Posts 목록 조회 : 검색결과 + 페이징 : 태그 없음
    @Override
    public Page<Posts> findPostsListBySearchWithoutTagNames(String keyword, Pageable pageable) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        List<Posts> content = queryFactory.selectFrom(posts).distinct()
                .leftJoin(posts.writer, member).fetchJoin()
                .leftJoin(posts.postsTags, postsTag).fetchJoin()
                .leftJoin(postsTag.tag, tag).fetchJoin()
                .where(posts.state.eq(Posts.State.ACTIVE), posts.title.containsIgnoreCase(keyword))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory.select(posts.count())
                .from(posts)
                .where(posts.state.eq(Posts.State.ACTIVE), posts.title.containsIgnoreCase(keyword));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);    }

    // Posts 목록 조회 : 유저이름 + 페이징
    @Override
    public Page<Posts> findPostsListByMemberName(String memberName, Pageable pageable) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        List<Posts> content = queryFactory
                .selectFrom(posts)
                .distinct()
                .leftJoin(posts.writer, member)
                .leftJoin(posts.postsTags, postsTag)
                .leftJoin(postsTag.tag, tag)
                .where(posts.state.notIn(Posts.State.DELETED), posts.writer.name.eq(memberName))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(posts.count())
                .from(posts)
                .where(posts.state.eq(Posts.State.ACTIVE), posts.writer.name.eq(memberName));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // Posts 목록 조회 : 마이 페이지 좋아요 한 글 + 페이징
    @Override
    public Page<Posts> findThumbUpPostsListByMemberName(String memberName, Pageable pageable) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        List<Posts> content = queryFactory
                .select(posts)
                .from(thumbup)
                .join(thumbup.parentPosts, posts)
                .join(thumbup.member, member)
                .where(posts.state.notIn(Posts.State.DELETED), posts.writer.name.eq(memberName))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(posts.count())
                .from(posts)
                .where(posts.state.eq(Posts.State.ACTIVE), posts.writer.name.eq(memberName));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // Posts 목록 조회 : 마이 페이지 북마크 한 글 + 페이징
    @Override
    public Page<Posts> findBookmarkPostsListByMemberName(String memberName, Pageable pageable) {
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, posts);

        List<Posts> content = queryFactory
                .select(posts)
                .from(bookmark)
                .join(bookmark.posts, posts)
                .join(bookmark.member, member)
                .where(posts.state.notIn(Posts.State.DELETED), posts.writer.name.eq(memberName))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(posts.count())
                .from(posts)
                .where(posts.state.eq(Posts.State.ACTIVE), posts.writer.name.eq(memberName));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    // 특정 회원이 쓴 글 개수 조회
    @Override
    public Long findMemberPostsCount(String memberName) {
        Long memberPostsCount = queryFactory
                .select(posts.count())
                .from(posts)
                .where(posts.state.notIn(Posts.State.DELETED), posts.writer.name.eq(memberName))
                .fetchOne();
        return memberPostsCount;
    }

    // 특정 회원이 좋아요 한 글 개수 조회
    @Override
    public Long findMemberThumbUpPostsCount(String memberName) {
        Long memberPostsCount = queryFactory
                .select(thumbup.count())
                .from(thumbup)
                .join(thumbup.parentPosts, posts)
                .where(posts.state.notIn(Posts.State.DELETED), thumbup.member.name.eq(memberName), thumbup.parentPosts.id.isNotNull())
                .fetchOne();
        return memberPostsCount;
    }

    // 특정 회원이 북마크 한 글 개수 조회
    @Override
    public Long findMemberBookmarkPostsCount(String memberName) {
        Long memberBookmarkPostsCount = queryFactory
                .select(posts.count())
                .from(bookmark)
                .join(bookmark.posts, posts)
                .where(posts.state.notIn(Posts.State.DELETED), posts.writer.name.eq(memberName))
                .fetchOne();
        return memberBookmarkPostsCount;
    }

    private OrderSpecifier[] getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, path);
        return orders.toArray(OrderSpecifier[]::new);
    }
}
