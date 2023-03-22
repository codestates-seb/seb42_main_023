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
    private final MemberService memberService;
    private final PostsService postsService;
    private final BookmarkRepository bookmarkRepository;

    // 북마크 저장
    public Bookmark createBookmark(String memberName, Long postsId) {
        Member member = memberService.findMember(memberName);
        Posts posts = postsService.findOne(postsId);

        Bookmark bookmark = Bookmark.builder()
                .member(member)
                .posts(posts)
                .build();

        return bookmarkRepository.save(bookmark);
    }

    // 북마크 삭제
    public void removeBookmark(String memberName, Long postsId) {
        Member member = memberService.findMember(memberName);
        Long memberId = member.getId();

        Bookmark bookmark = findBookmark(memberId, postsId);

        bookmarkRepository.delete(bookmark);
    }

    // 북마크 조회
    private Bookmark findBookmark(Long memberId, Long postsId) {
        Optional<Bookmark> bookmark = bookmarkRepository.findByMember_IdAndPosts_Id(memberId, postsId);

        return bookmark
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.BOOKMARK_NOT_FOUND));
    }
}
