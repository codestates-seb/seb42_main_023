package com.teamdragon.dragonmoney.app.domain.posts.repository;

import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface PostsRepositoryCustom {

    // 주간 인기 게시물 목록 조회
    List<Posts> findWeeklyPopularList(int size, LocalDateTime from, LocalDateTime to);
    // 명예의 전당 목록 조회
    Page<Posts> findBestAwardsListByPage(Pageable pageable);
    // 추천 게시물 목록 조회
    List<Posts> findRecommendPostsList(int size);

    // 단일 조회
    PostsDto.PostsDetailRes findPostsDetailById(Long postsId);
    // 단일 조회 : 로그인 유저 : 북마크 여부, 좋아요 여부, 싫어요 여부 추가
    PostsDto.PostsDetailRes findPostsDetailByMemberId(Long postsId, Long loginMemberId);
    // 목록 조회
    Page<Posts> findPostsListByPage(Pageable pageable);
    // 목록 조회 : 검색
    Page<Posts> findPostsListBySearch(String keyword, String[] tagNames, Pageable pageable);
    // 목록 조회 : 검색 : 태그 없는경우
    Page<Posts> findPostsListBySearchWithoutTagNames(String keyword, Pageable pageable);
    // 목록 조회 : 회원 이름
    Page<Posts> findPostsListByMemberName(String memberName, Pageable pageable);

    // 마이페이지
    Long findMemberPostsCount(String memberName);
    Long findMemberThumbUpPostsCount(String memberName);
    Long findMemberBookmarkPostsCount(String memberName);
    Page<Posts> findThumbUpPostsListByMemberName(String memberName, Pageable pageable);
    Page<Posts> findBookmarkPostsListByMemberName(String memberName, Pageable pageable);

    // 회원 탈퇴로 인한 댓글 삭제
    void deletedPostsByDeletedMember(Member member, DeleteResult deleteResult);
}
