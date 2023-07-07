package com.teamdragon.dragonmoney.app.global.pagenation;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.Expressions;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.ObjectUtils.isEmpty;

// QueryDsl 정렬 기준 생성용 클래스
public class QueryDslUtil {

    public static List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable, Path path) {
        List<OrderSpecifier> ORDERS = new ArrayList<>();
        if (!isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                OrderSpecifier<?> createdDate
                        = QueryDslUtil.getSortedColumn(direction, path, order.getProperty());
                ORDERS.add(createdDate);
            }
        }
        return ORDERS;
    }

    public static OrderSpecifier<?> getSortedColumn(Order order, Path<?> parent, String fieldName) {
        Path<Object> fieldPath = Expressions.path(Object.class, parent, fieldName);

        return new OrderSpecifier(order, fieldPath);
    }
}
