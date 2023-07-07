package com.teamdragon.dragonmoney.app.domain.bookmark.repository;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByMember_IdAndPosts_Id(Long memberId, Long postsId);
    void deleteByMember_Id(Long memberId);
}
