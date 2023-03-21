package com.teamdragon.dragonmoney.app.domain.posts.controller;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.mapper.ImageMapper;
import com.teamdragon.dragonmoney.app.domain.image.service.ImageService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.mapper.PostsMapper;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.*;

@RequiredArgsConstructor
@Validated
@RequestMapping("/posts")
@RestController
public class PostsController {

    private final PostsService postsService;
    private final PostsMapper postsMapper;
    private final ImageService imageService;
    private final ImageMapper imageMapper;
    private final MemberService memberService;

    // 추가
    @PostMapping
    public ResponseEntity<Map<String, Long>> postPosts(@AuthenticationPrincipal Principal principal,
                                                       @Valid @RequestBody PostsDto.Post postsDto) {
        Member loginMember = memberService.findMember(principal.getName());
        // 이미지 처리
        PostsDto.PostImagesDto saveImages = postsDto.getSaveImages();
        List<Image> removedImages
                = imageMapper.imageDtoListToImageList(saveImages.getRemovedImages());
        imageService.removeImages(loginMember, removedImages);
        // Posts 처리
        Posts posts = postsMapper.postDtoToPosts(postsDto);
        Posts savePosts = postsService.savePosts(loginMember, posts);
        Map<String, Long> response = new HashMap<>();
        // 주의 : postId <<< postsId 가 아님
        response.put("postId", savePosts.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 삭제 :   주의 : RequestParam post-id <<< posts-id 가 아님
    @DeleteMapping("/{post-id}")
    public ResponseEntity<Void> deletePosts(@AuthenticationPrincipal Principal principal,
                                            @Valid @Positive @RequestParam("post-id") Long postsId) {
        Member loginMember = memberService.findMember(principal.getName());
        postsService.removePosts(loginMember, postsId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity<Map<String, Long>> patchPosts(@AuthenticationPrincipal Principal principal,
                                                        @Valid @RequestBody PostsDto.Patch patchDto,
                                                        @Valid @Positive @RequestParam("post-id") Long postsId) {
        Member loginMember = memberService.findMember(principal.getName());
        // 이미지 처리
        PostsDto.PatchImagesDto saveImages = patchDto.getSaveImages();
        List<Image> removedImages
                = imageMapper.imageDtoListToImageList(saveImages.getRemovedImages());
        imageService.removeImages(loginMember, removedImages);
        // Posts 처리
        Posts posts = postsMapper.patchDtoToPosts(patchDto);
        Posts updatePosts = postsService.updatePosts(loginMember, postsId, posts);
        Map<String, Long> response = new HashMap<>();
        // 주의 : postId <<< postsId 가 아님
        response.put("postId", updatePosts.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 상세 조회
    @GetMapping("/post-id")
    public ResponseEntity<PostsDto.PostsDetail> getPostsDetail(@AuthenticationPrincipal Principal principal,
                                                               @Valid @Positive @RequestParam("post-id") Long postsId) {
        Long loginMemberId = null;
        if (principal != null) {
            Member loginMember = memberService.findMember(principal.getName());
            loginMemberId = loginMember.getId();
        }
        PostsDto.PostsDetail postsDetail = postsService.findPostsDetail(postsId, loginMemberId);
        return new ResponseEntity<>(postsDetail, HttpStatus.OK);
    }

    // 목록 조회
    @GetMapping
    public ResponseEntity<PostsDto.PostsList> getPostsList(@Valid @Positive @RequestParam int page,
                                                           @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        Page<Posts> postsList = postsService.findPostsList(page, orderBy);
        PostsDto.PostsList response = new PostsDto.PostsList(postsList, orderBy.getOrderBy());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 검색
    @GetMapping("/search")
    public ResponseEntity<PostsDto.PostsList> getSearchPostsList(@RequestParam String keyword,
                                                                 @RequestParam String[] tags,
                                                                 @Valid @Positive @RequestParam int page,
                                                                 @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        Page<Posts> postsList = postsService.findPostsListByTagsAndTitle(keyword, tags, page, orderBy);
        PostsDto.PostsList response = new PostsDto.PostsList(postsList, orderBy.getOrderBy());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // orderby 유효성검사 및 변환
    private Posts.OrderBy checkOrderBy(String orderby) {
        for (Posts.OrderBy postsOrderby : Posts.OrderBy.values()) {
            if (postsOrderby.getOrderBy().equals(orderby)) {
                return postsOrderby;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.ORDER_BY_NOT_VALID);
    }
}
