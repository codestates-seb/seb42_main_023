package com.teamdragon.dragonmoney.app.domain.tag.repository;

public interface TagRepositoryCustom {
    // 태그 삭제 : 참조되는곳이 없는 태그들 삭제
    void deleteOrphanTag();
}
