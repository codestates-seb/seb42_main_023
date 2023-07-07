package com.teamdragon.dragonmoney.app.domain.image.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static com.teamdragon.dragonmoney.app.domain.image.entity.QImage.*;

@RequiredArgsConstructor
public class ImageRepositoryImpl implements ImageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // 이미지 조회 : id List 에 해당하는 복수 image 조회
    @Override
    public List<Image> findAllByIds(List<Long> imageIds) {
        return queryFactory
                .selectFrom(image)
                .where(image.id.in(imageIds))
                .fetch();
    }

    // 이미지 조회 : id List 와 회원 id 를 통한 조회
    @Override
    public List<Image> findAllByIdsAndMemberId(List<Long> imageIds, Long memberId) {
        return queryFactory.selectFrom(image)
                .where(image.id.in(imageIds))
                .where(image.uploader.id.eq(memberId))
                .fetch();
    }

    // List 에 해당하는 복수 image 삭제
    @Override
    public void deleteImagesByIds(List<Long> imageIds) {
        queryFactory.delete(image)
                .where(image.id.in(imageIds))
                .execute();
    }

    // 이미지 조회 : 고아 이미지 조회 : 아무 게시글에서도 참조되지 않는 이미지
    @Override
    public List<Image> findAllOrphanImageList(LocalDateTime createFrom, LocalDateTime createTo) {
        return queryFactory.selectFrom(image)
                .where(
                        image.posts.isNull()
                        ,image.createdAt.notBetween(createFrom, createTo)
                )
                .fetch();
    }
}
