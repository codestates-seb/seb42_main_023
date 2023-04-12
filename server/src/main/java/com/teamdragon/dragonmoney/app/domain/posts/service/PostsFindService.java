package com.teamdragon.dragonmoney.app.domain.posts.service;

import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import org.springframework.data.domain.Page;

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

    // 게시글 목록 조회 : 작성자 닉네임
    Page<Posts> findPostsListByWriterPost(String memberName, int page, Posts.OrderBy orderBy);

    // 게시물 목록 조회 : 회원이 좋아요 한 글 (마이 페이지)
    Page<Posts> findPostsListByThumbUpPost(String memberName, int page, Posts.OrderBy orderBy);

    // 게시물 목록 조회 : 회원이 북마크 한 글 (마이 페이지)
    Page<Posts> findPostsListByBookmarkPost(String memberName, int page, Posts.OrderBy orderBy);

    // 유효한 Posts 조회
    Posts findVerifyPostsById(Long postsId) ;
}
