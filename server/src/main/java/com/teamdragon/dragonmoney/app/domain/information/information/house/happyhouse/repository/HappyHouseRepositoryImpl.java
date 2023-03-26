package com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity.HappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity.QHappyHouse;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service.HappyHouseAreaCode;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service.HappyHouseState;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.global.pagenation.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.entity.QHappyHouse.*;

@RequiredArgsConstructor
public class HappyHouseRepositoryImpl implements HappyHouseRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<HappyHouse> findHappyHouseListByPage(Pageable pageable, HappyHouseAreaCode location, HappyHouseState state) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, happyHouse);

        List<HappyHouse> content = queryFactory
                .select(happyHouse)
                .from(happyHouse)
                .where(happyHouse.location.contains(location.getName()), happyHouse.noticeState.eq(state.getStateName()))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(happyHouse.count())
                .distinct()
                .from(happyHouse)
                .where(happyHouse.location.eq(location.getName()), happyHouse.noticeState.eq(state.getStateName()));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    @Override
    public Page<HappyHouse> findHappyHouseListByPageAllState(Pageable pageable, HappyHouseAreaCode location) {
        // 정렬 기준 변환
        OrderSpecifier[] orders = getAllOrderSpecifiers(pageable, happyHouse);

        List<HappyHouse> content = queryFactory
                .select(happyHouse)
                .from(happyHouse)
                .where(happyHouse.location.contains(location.getName()))
                .orderBy(orders)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(happyHouse.count())
                .distinct()
                .from(happyHouse)
                .where(happyHouse.location.contains(location.getName()));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private OrderSpecifier[] getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, path);
        return orders.toArray(OrderSpecifier[]::new);
    }
}
