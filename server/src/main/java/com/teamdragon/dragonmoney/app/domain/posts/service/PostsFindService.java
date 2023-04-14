package com.teamdragon.dragonmoney.app.domain.posts.service;

import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;

public interface PostsFindService {

    Posts findOne(Long postsId);

    // 단일 조회 : Active 상태
    Posts findOneStateActive(Long postsId) ;

    // 게시글 상세 조회 : 게시글 id
    PostsDto.PostsDetailRes findPostsDetails(Long postsId, Long loginMemberId);

    // 게시글 목록 조회 : 요청페이지번호, 정렬기준
    PostsDto.PostsListRes findPostsList(int page, Posts.OrderBy orderBy);

    // 게시글 목록 조회 : 검색기능 : 태그목록 + 제목
    PostsDto.PostsListRes findPostsListByTagsAndTitle(String keyword, String[] tagNames, int page, Posts.OrderBy orderBy);

    // 게시글 목록 조회 : 작성자 닉네임 (마이 페이지)
    MyPageDto.MyPageMemberPostsListRes findPostsListByWriterPosts(int page, String memberName);

    // 게시물 목록 조회 : 회원이 좋아요 한 글 (마이 페이지)
    MyPageDto.MyPageMemberPostsListRes findPostsListByThumbUpPosts(int page, String memberName);

    // 게시물 목록 조회 : 회원이 북마크 한 글 (마이 페이지)
    MyPageDto.MyPageMemberPostsListRes findPostsListByBookmarkPosts(int page, String memberName);

    // 게시물 개수 조회 : 회원이 작성한 글 (마이 페이지)
    Long findPostsCountByWriter(String memberName);

    // 게시물 개수 조회 : 회원이 좋아요 한 글 (마이 페이지)
    Long findThumbUpPostsCountByMember(String memberName);

    // 게시물 개수 조회 : 회원이 북마크 한 글 (마이 페이지)
    Long findBookmarkPostsCountByMember(String memberName);

    // 유효한 Posts 조회
    Posts findVerifyPostsById(Long postsId) ;
}
