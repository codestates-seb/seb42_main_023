package com.teamdragon.dragonmoney.app.domain.image.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.image.entity.QImage.*;

@RequiredArgsConstructor
public class ImageRepositoryImpl implements ImageRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public void deleteImagesByIds(List<Long> imageIds) {
        queryFactory.delete(image)
                .where(image.id.in(imageIds))
                .execute();
    }
}
