package com.teamdragon.dragonmoney.app.domain.post.service;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.category.service.CategoryService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.domain.post.entity.Post;
import com.teamdragon.dragonmoney.app.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PostService {

    private final MemberService memberService;
    private final CategoryService categoryService;
    private final PostRepository postRepository;
    // 현재 운영에 사용되는 카테고리는 1개 이다.
    private final Long CURRENT_CATEGORY_ID = 1L;

    // 게시글 생성
    public Post savePost(String writerName, Post newPost){

        Member writer = memberService.findMember(writerName);
        Category category = categoryService.findCategoryById(CURRENT_CATEGORY_ID);

        Post post = Post.builder()
                .writer(writer)
                .category(category)
                .viewCount(0L)
                .title(newPost.getTitle())
                .content(newPost.getContent())
                .state(Post.State.ACTIVE)
                .deleteResult(null)
                .build();

        return postRepository.save(post);
    }

    // 게시글 삭제
    public Post removePost(Long postId){
        return null;
    }

    // 게시글 수정
    public Post updatePost(Long postId, Post updatePost){
        return null;
    }

    // 게시글 단일 조회 : 게시글 id
    public Post findOnePost(Long postId){
        return null;
    }

    // 게시글 상세 조회 : 게시글 id
    public Post findOneDetailPost(Long postId){
        return null;
    }

    // 게시글 목록 조회 : 요청페이지번호, 정렬기준
    public Post findListPost(int page, String orderBy){
        return null;
    }

    // 게시글 목록 조회 : 검색기능 : 태그목록 + 제목
    public Post findListByTagsAndTitle(){
        return null;
    }

    // 게시글 목록 조회 : 작성자 닉네임
    public Post findListByWriterPost(){
        return null;
    }
}