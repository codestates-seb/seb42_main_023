package com.teamdragon.dragonmoney.app.domain.bookmark.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import com.teamdragon.dragonmoney.app.domain.bookmark.repository.BookmarkRepository;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsFindService;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class BookmarkHandleServiceImpl implements BookmarkHandleService {

    private final PostsFindService postsFindService;
    private final PostsHandleService postsHandleService;
    private final BookmarkFindService bookmarkFindService;
    private final BookmarkRepository bookmarkRepository;

    // 북마크 중복 조회
    @Override
    public void duplicateCheckBookmark(Member loginMember, Long postsId) {
        Optional<Bookmark> bookmark
                = bookmarkRepository.findByMember_IdAndPosts_Id(loginMember.getId(), postsId);
        if(bookmark.isEmpty()){
            createBookmark(loginMember,postsId);
        }
    }

    // 북마크 저장
    @Override
    public Bookmark createBookmark(Member loginMember, Long postsId) {
        Posts posts = postsFindService.findOne(postsId);
        posts.plusBookmarkCount();

        Bookmark bookmark = Bookmark.builder()
                .member(loginMember)
                .posts(posts)
                .build();

        return bookmarkRepository.save(bookmark);
    }

    // 북마크 삭제
    @Override
    public void removeBookmark(Member loginMember, Long postsId) {
        Bookmark bookmark = bookmarkFindService.findBookmark(loginMember, postsId);
        Posts posts = bookmark.getPosts();
        postsHandleService.minusBookmarkCount(posts);

        bookmarkRepository.delete(bookmark);
    }

    // 회원 탈퇴 시 북마크 삭제
    @Override
    public void removeAllBookmarkByMemberId(Long memberId) {
        bookmarkRepository.deleteByMember_Id(memberId);
    }
}