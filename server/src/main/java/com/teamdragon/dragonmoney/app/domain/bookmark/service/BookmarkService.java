package com.teamdragon.dragonmoney.app.domain.bookmark.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import com.teamdragon.dragonmoney.app.domain.bookmark.repository.BookmarkRepository;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class BookmarkService {
    private final PostsService postsService;
    private final BookmarkRepository bookmarkRepository;

    // 북마크 중복 조회
    public void duplicateCheckBookmark(Member loginMember, Long postsId) {
        Optional<Bookmark> bookmark
                = bookmarkRepository.findByMember_IdAndPosts_Id(loginMember.getId(), postsId);
        if(bookmark.isEmpty()){
            createBookmark(loginMember,postsId);
        }
    }

    // 북마크 저장
    public Bookmark createBookmark(Member loginMember, Long postsId) {
        Posts posts = postsService.findOne(postsId);
        posts.plusBookmarkCount();

        Bookmark bookmark = Bookmark.builder()
                .member(loginMember)
                .posts(posts)
                .build();

        return bookmarkRepository.save(bookmark);
    }

    // 북마크 삭제
    public void removeBookmark(Member loginMember, Long postsId) {
        Bookmark bookmark = findBookmark(loginMember, postsId);
        Posts posts = bookmark.getPosts();
        postsService.minusBookmarkCount(posts);

        bookmarkRepository.delete(bookmark);
    }

    // 회원 탈퇴 시 북마크 삭제
    public void removeAllBookmarkByMemberId(Long memberId) {
        bookmarkRepository.deleteByMember_Id(memberId);
    }

    // 북마크 조회
    private Bookmark findBookmark(Member loginMember, Long postsId) {
        Long memberId = loginMember.getId();

        Optional<Bookmark> bookmark = bookmarkRepository.findByMember_IdAndPosts_Id(memberId, postsId);

        return bookmark
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.BOOKMARK_NOT_FOUND));
    }
}
