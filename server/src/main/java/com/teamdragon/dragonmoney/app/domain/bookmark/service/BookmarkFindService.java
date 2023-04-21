package com.teamdragon.dragonmoney.app.domain.bookmark.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.entity.Bookmark;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

public interface BookmarkFindService {

    // 북마크 조회
    Bookmark findBookmark(Member loginMember, Long postsId);
}