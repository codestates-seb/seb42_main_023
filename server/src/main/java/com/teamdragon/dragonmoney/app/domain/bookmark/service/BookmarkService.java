package com.teamdragon.dragonmoney.app.domain.bookmark.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import com.teamdragon.dragonmoney.app.domain.bookmark.repository.BookmarkRepository;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
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
    public void checkBookmark(Member member, Long postsId) {
        Long memberId = member.getId();

        Optional<Bookmark> bookmark = bookmarkRepository.findByMember_IdAndPosts_Id(memberId, postsId);

        if(bookmark.isEmpty()){
            createBookmark(member,postsId);
        }
    }

    // 북마크 저장
    public Bookmark createBookmark(Member member, Long postsId) {
        Posts posts = postsService.findOne(postsId);
        posts.plusBookmarkCount();

        Bookmark bookmark = Bookmark.builder()
                .member(member)
                .posts(posts)
                .build();

        return bookmarkRepository.save(bookmark);
    }

    // 북마크 삭제
    public void removeBookmark(Member member, Long postsId) {
        Bookmark bookmark = findBookmark(member, postsId);
        Posts posts = bookmark.getPosts();
        postsService.minusBookmarkCount(posts);

        bookmarkRepository.delete(bookmark);
    }

    // 회원 탈퇴 시 북마크 삭제
    public void removeAllBookmarkByMemberId(Long memberId) {
        bookmarkRepository.deleteByMember_Id(memberId);
    }

    // 북마크 조회
    private Bookmark findBookmark(Member member, Long postsId) {
        Long memberId = member.getId();

        Optional<Bookmark> bookmark = bookmarkRepository.findByMember_IdAndPosts_Id(memberId, postsId);

        return bookmark
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.BOOKMARK_NOT_FOUND));
    }
}
