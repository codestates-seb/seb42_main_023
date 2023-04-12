package com.teamdragon.dragonmoney.app.domain.bookmark.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

public interface BookmarkHandleService {

    // 북마크 중복 조회
    void duplicateCheckBookmark(Member loginMember, Long postsId);

    // 북마크 저장
    Bookmark createBookmark(Member loginMember, Long postsId);

    // 북마크 삭제
    void removeBookmark(Member loginMember, Long postsId);

    // 회원 탈퇴 시 북마크 삭제
    void removeAllBookmarkByMemberId(Long memberId);
}