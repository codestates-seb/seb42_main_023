package com.teamdragon.dragonmoney.app.domain.posts.service;

import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class PostsFindServiceImpl implements PostsFindService {

    private final PostsRepository postsRepository;
    private static final int PAGE_ELEMENT_SIZE = 10;
    private static final String PAGE_ELEMENT_ORDER_BY = "latest";

    // Posts 엔티티 조회
    @Override
    public Posts findOne(Long postsId){
        return findVerifyPostsById(postsId);
    }

    // 단일 조회 : Active 상태
    @Override
    public Posts findOneStateActive(Long postsId) {
        Posts findPosts = findVerifyPostsById(postsId);
        if (findPosts.getState() != Posts.State.ACTIVE) {
            throw new BusinessLogicException(BusinessExceptionCode.THUMB_UNUSABLE);
        }
        return findPosts;
    }

    // 게시글 상세 조회 : 게시글 id
    @Override
    public PostsDto.PostsDetailRes findPostsDetails(Long postsId, Long loginMemberId, Boolean isVisited){
        if (!isVisited) {
            plusViewCount(postsId);
        }

        if (loginMemberId == null) {
            return postsRepository.findPostsDetailById(postsId);
        } else {
            return postsRepository.findPostsDetailByMemberId(postsId, loginMemberId);
        }
    }

    // 게시글 목록 조회 : 요청페이지번호, 정렬기준
    @Override
    public PostsDto.PostsListRes findPostsList(int page, Posts.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        Page<Posts> postsList = postsRepository.findPostsListByPage(pageable);
        return new PostsDto.PostsListRes(postsList, orderBy.getOrderBy());
    }

    // 게시글 목록 조회 : 검색기능 : 태그목록 + 제목
    @Override
    public PostsDto.PostsListRes findPostsListByTagsAndTitle(String keyword, String[] tagNames, int page, Posts.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        Page<Posts> postsList;
        if (tagNames == null || tagNames.length == 0) {
            postsList = postsRepository.findPostsListBySearchWithoutTagNames(keyword, pageable);
        } else {
            postsList = postsRepository.findPostsListBySearch(keyword, tagNames, pageable);
        }
        return new PostsDto.PostsListRes(postsList, orderBy.getOrderBy());
    }

    // 게시글 목록 조회 : 회원이 작성한 글 (마이 페이지)
    @Override
    public MyPageDto.MyPageMemberPostsListRes findPostsListByWriterPosts(int page, String memberName) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(Posts.OrderBy.LATEST.getTargetProperty()).descending());
        Page<Posts> postsPage = postsRepository.findPostsListByMemberName(memberName, pageable);

        return new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 게시물 목록 조회 : 회원이 좋아요 한 글 (마이 페이지)
    @Override
    public MyPageDto.MyPageMemberPostsListRes findPostsListByThumbUpPosts(int page, String memberName) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(Posts.OrderBy.LATEST.getTargetProperty()).descending());
        Page<Posts> postsPage = postsRepository.findThumbUpPostsListByMemberName(memberName, pageable);

        return new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 게시물 목록 조회 : 회원이 북마크 한 글 (마이 페이지)
    @Override
    public MyPageDto.MyPageMemberPostsListRes findPostsListByBookmarkPosts(int page, String memberName) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(Posts.OrderBy.LATEST.getTargetProperty()).descending());
        Page<Posts> postsPage = postsRepository.findBookmarkPostsListByMemberName(memberName, pageable);

        return new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 게시물 개수 조회 : 회원이 작성한 글 (마이 페이지)
    @Override
    public Long findPostsCountByWriter(String memberName) {
        return postsRepository.findMemberPostsCount(memberName);
    }

    // 게시물 개수 조회 : 회원이 좋아요 한 글 (마이 페이지)
    @Override
    public Long findThumbUpPostsCountByMember(String memberName) {
        return postsRepository.findMemberThumbUpPostsCount(memberName);
    }

    // 게시물 개수 조회 : 회원이 북마크 한 글 (마이 페이지)
    @Override
    public Long findBookmarkPostsCountByMember(String memberName) {
        return postsRepository.findMemberBookmarkPostsCount(memberName);
    }

    // 유효한 Posts 조회
    @Override
    public Posts findVerifyPostsById(Long postsId) {
        Optional<Posts> findPosts = postsRepository.findById(postsId);
        if (findPosts.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.POSTS_NOT_FOUND);
        }
        return findPosts.get();
    }

    // 조회수 증가
    private void plusViewCount(Long postsId) {
        postsRepository.updatePlusViewCount(postsId);
    }
}
