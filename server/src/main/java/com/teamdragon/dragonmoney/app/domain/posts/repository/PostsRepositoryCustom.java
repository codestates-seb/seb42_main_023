package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostsRepositoryCustom {

    // 게시글 최신 상태 조회
    Posts findLatestPosts(Posts posts);
    // 단일 조회
    PostsDto.PostsDetailRes findPostsDetailById(Long postsId);
    // 단일 조회 : 로그인 유저 : 북마크 여부, 좋아요 여부, 싫어요 여부 추가
    PostsDto.PostsDetailRes findPostsDetailByMemberId(Long postsId, Long loginMemberId);
    // 목록 조회
    Page<Posts> findPostsListByPage(Pageable pageable);
    // 목록 조회 : 검색
    Page<Posts> findPostsListBySearch(String keyword, String[] tagNames, Pageable pageable);
    // 목록 조회 : 회원 이름
    Page<Posts> findPostsListByMemberName(String memberName, Pageable pageable);
    // 조회수 증가
    void plusViewCountById(Long postsId);

    // 마이페이지
    Long findMemberPostsCount(String memberName);
    Long findMemberThumbUpPostsCount(String memberName);
    Long findMemberBookmarkPostsCount(String memberName);
    Page<Posts> findThumbUpPostsListByMemberName(String memberName, Pageable pageable);
    Page<Posts> findBookmarkPostsListByMemberName(String memberName, Pageable pageable);
}
