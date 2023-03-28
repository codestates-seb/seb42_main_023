package com.teamdragon.dragonmoney.app.domain.image.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.image.entity.QImage.*;

@RequiredArgsConstructor
public class ImageRepositoryImpl implements ImageRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Image> findAllByIds(List<Long> imageIds) {
        return queryFactory
                .selectFrom(image)
                .where(image.id.in(imageIds))
                .fetch();
    }

    @Override
    public List<Image> findAllByIdsAndMemberId(List<Long> imageIds, Long memberId) {
        return queryFactory.selectFrom(image)
                .where(image.id.in(imageIds))
                .where(image.uploader.id.eq(memberId))
                .fetch();
    }

    @Override
    public void deleteImagesByIds(List<Long> imageIds) {
        queryFactory.delete(image)
                .where(image.id.in(imageIds))
                .execute();
    }
}
