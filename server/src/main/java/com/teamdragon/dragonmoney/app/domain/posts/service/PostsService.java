package com.teamdragon.dragonmoney.app.domain.posts.service;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.category.service.CategoryService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class PostsService implements ThumbCountService {

    private final MemberService memberService;
    private final CategoryService categoryService;
    private final PostsRepository postsRepository;
    // 현재 운영에 사용되는 카테고리는 1개 이다.
    private final Long CURRENT_CATEGORY_ID = 1L;

    // 게시글 생성
    public Posts savePost(String writerName, Posts newPosts){

        Member writer = memberService.findMember(writerName);
        Category category = categoryService.findCategoryById(CURRENT_CATEGORY_ID);

        Posts posts = Posts.builder()
                .writer(writer)
                .category(category)
                .viewCount(0L)
                .title(newPosts.getTitle())
                .content(newPosts.getContent())
                .state(Posts.State.ACTIVE)
                .deleteResult(null)
                .build();

        return postsRepository.save(posts);
    }

    // 게시글 삭제
    public Posts removePost(Long postId){
        return null;
    }

    // 게시글 수정
    public Posts updatePost(Long postId, Posts updatePosts){
        return null;
    }

    // 게시글 단일 조회 : 게시글 id
    public Posts findOnePost(Long postId){
        return null;
    }

    // 게시글 상세 조회 : 게시글 id
    public Posts findOneDetailPost(Long postId){
        return null;
    }

    // 게시글 목록 조회 : 요청페이지번호, 정렬기준
    public Posts findListPost(int page, String orderBy){
        return null;
    }

    // 게시글 목록 조회 : 검색기능 : 태그목록 + 제목
    public Posts findListByTagsAndTitle(){
        return null;
    }

    // 게시글 목록 조회 : 작성자 닉네임
    public Posts findListByWriterPost(){
        return null;
    }

    @Override
    public Thumb thumbupPlusUpdate(Long postsId, boolean needInquiry) {
        postsRepository.updateThumbupCountPlus(postsId);
        return getThumbByNeedInquiry(needInquiry, postsId);
    }

    @Override
    public Thumb thumbupMinusUpdate(Long postsId, boolean needInquiry) {
        postsRepository.updateThumbupCountMinus(postsId);
        return getThumbByNeedInquiry(needInquiry, postsId);
    }

    @Override
    public Thumb thumbdownPlusUpdate(Long postsId, boolean needInquiry) {
        postsRepository.updateThumbdownCountPlus(postsId);
        return getThumbByNeedInquiry(needInquiry, postsId);
    }

    @Override
    public Thumb thumbdownMinusUpdate(Long postsId, boolean needInquiry) {
        postsRepository.updateThumbdownCountMinus(postsId);
        return getThumbByNeedInquiry(needInquiry, postsId);
    }

    // 조회 필요 여부에 따른 좋아요,싫어요 정보 반환
    private Thumb getThumbByNeedInquiry(boolean needInquiry, Long postsId) {
        if (needInquiry) {
            return findVerifyPostsById(postsId).getThumbCount();
        }
        return null;
    }

    // 유효한 Posts 조회
    private Posts findVerifyPostsById(Long postId) {
        Optional<Posts> findPosts = postsRepository.findById(postId);
        if (findPosts.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.POSTS_NOT_FOUND);
        }
        return findPosts.get();
    }
}