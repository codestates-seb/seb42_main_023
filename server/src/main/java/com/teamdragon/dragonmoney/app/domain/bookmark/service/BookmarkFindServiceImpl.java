package com.teamdragon.dragonmoney.app.domain.bookmark.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import com.teamdragon.dragonmoney.app.domain.bookmark.repository.BookmarkRepository;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class BookmarkFindServiceImpl implements BookmarkFindService {

    private final BookmarkRepository bookmarkRepository;

    // 북마크 조회
    @Override
    public Bookmark findBookmark(Member loginMember, Long postsId) {
        Long memberId = loginMember.getId();

        Optional<Bookmark> bookmark = bookmarkRepository.findByMember_IdAndPosts_Id(memberId, postsId);

        return bookmark
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.BOOKMARK_NOT_FOUND));
    }
}