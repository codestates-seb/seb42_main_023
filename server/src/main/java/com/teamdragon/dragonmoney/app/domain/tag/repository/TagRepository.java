package com.teamdragon.dragonmoney.app.domain.tag.repository;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>, TagRepositoryCustom {
    // 단일 조회 : 태그 이름
    Optional<Tag> findByName(String tagName);
}
