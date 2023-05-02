package com.teamdragon.dragonmoney.app.domain.posts.controller;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.mapper.ImageMapper;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.domain.posts.VisitCookieHandler;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.mapper.PostsMapper;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsFindService;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleService;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.*;

@RequiredArgsConstructor
@Validated
@RequestMapping
@RestController
public class PostsController {

    private final PostsFindService postsFindService;
    private final PostsHandleService postsHandleService;
    private final PostsMapper postsMapper;
    private final ImageMapper imageMapper;
    private final MemberFindService memberFindService;
    private final VisitCookieHandler visitCookieHandler;

    // 추가
    @PostMapping("/posts")
    public ResponseEntity<PostsDto.CreateRes> createPosts(@AuthenticationPrincipal Principal principal,
                                                          @Valid @RequestBody PostsDto.CreateReq postsDto) {
        Member loginMember = memberFindService.findVerifyMemberByName(principal.getName());
        // 이미지 처리
        PostsDto.CreatePostsImagesReq saveImages = postsDto.getSaveImages();
        List<Image> removedImages = null;
        if(saveImages != null) {
            removedImages = imageMapper.postImageDtoListToImageList(saveImages.getRemovedImages());
        }

        // Posts 처리
        Posts posts = postsMapper.postDtoToPosts(postsDto);
        Posts savePosts = postsHandleService.savePosts(loginMember, posts, removedImages);
        PostsDto.CreateRes response = new PostsDto.CreateRes(savePosts.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 삭제 :   주의 : RequestParam post-id <<< posts-id 가 아님
    @DeleteMapping("/posts/{post-id}")
    public ResponseEntity<Void> removePosts(@AuthenticationPrincipal Principal principal,
                                            @Valid @Positive @PathVariable("post-id") Long postsId) {
        Member loginMember = memberFindService.findVerifyMemberByName(principal.getName());
        postsHandleService.removePosts(loginMember, postsId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/posts/{post-id}")
    public ResponseEntity<PostsDto.UpdateRes> modifyPosts(@AuthenticationPrincipal Principal principal,
                                                          @Valid @RequestBody PostsDto.UpdateReq updateReqDto,
                                                          @Valid @Positive @PathVariable("post-id") Long postsId) {
        Member loginMember = memberFindService.findVerifyMemberByName(principal.getName());
        // 이미지 처리
        PostsDto.UpdatePostsImagesReq saveImages = updateReqDto.getSaveImages();
        List<Image> removedImages = null;
        if (saveImages != null) {
            removedImages = imageMapper.postImageDtoListToImageList(saveImages.getRemovedImages());
        }
        // Posts 처리
        Posts posts = postsMapper.patchDtoToPosts(updateReqDto);
        Posts updatePosts = postsHandleService.updatePosts(loginMember, postsId, posts, removedImages);
        PostsDto.UpdateRes response = new PostsDto.UpdateRes(updatePosts.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 상세 조회
    @GetMapping("/posts/{post-id}")
    public ResponseEntity<PostsDto.PostsDetailRes> findPostsDetails(@AuthenticationPrincipal Principal principal,
                                                                    HttpServletRequest request,
                                                                    @CookieValue(value = "visitList", required = false) Cookie cookie,
                                                                    @Valid @Positive @PathVariable("post-id") Long postsId) {
        // 방문 여부 판단
        Boolean isVisited = visitCookieHandler.checkVisit(cookie, postsId);

        Long loginMemberId = null;
        if (principal != null) {
            Member loginMember = memberFindService.findVerifyMemberByName(principal.getName());
            loginMemberId = loginMember.getId();
        }

        PostsDto.PostsDetailRes postsDetail = postsFindService.findPostsDetails(postsId, loginMemberId, isVisited);

        // 응답 쿠키 구성
        Cookie resCookie = visitCookieHandler.generateCookie(cookie, postsId);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, resCookie.toString())
                .body(postsDetail);
    }

    // 목록 조회
    @GetMapping("/posts")
    public ResponseEntity<PostsDto.PostsListRes> findPostsList(@Valid @Positive @RequestParam int page,
                                                               @Valid @NotBlank @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        PostsDto.PostsListRes response = postsFindService.findPostsList(page, orderBy);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 게시글 목록 조회 : 작성자 닉네임 (마이 페이지)
    @GetMapping("/members/{member-name}/posts")
    public ResponseEntity<MyPageDto.MyPageMemberPostsListRes> findPostsListByMember(@PathVariable("member-name") String memberName,
                                                                                    @Valid @Positive @RequestParam int page) {
        memberFindService.findVerifyMemberByName(memberName);
        MyPageDto.MyPageMemberPostsListRes response = postsFindService.findPostsListByWriterPosts(page, memberName);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 게시물 목록 조회 : 회원이 좋아요 한 글 (마이 페이지)
    @GetMapping("/members/{member-name}/thumbup/posts")
    public ResponseEntity<MyPageDto.MyPageMemberPostsListRes> findThumbUpPostsListByMember(@PathVariable("member-name") String memberName,
                                                                                           @Valid @Positive @RequestParam int page) {
        memberFindService.findVerifyMemberByName(memberName);
        MyPageDto.MyPageMemberPostsListRes response = postsFindService.findPostsListByThumbUpPosts(page, memberName);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 게시물 목록 조회 : 회원이 북마크 한 글 (마이 페이지)
    @GetMapping("/members/{member-name}/bookmark")
    public ResponseEntity<MyPageDto.MyPageMemberPostsListRes> findBookmarkListByMember(@PathVariable("member-name") String memberName,
                                                                                       @Valid @Positive @RequestParam int page) {
        memberFindService.findVerifyMemberByName(memberName);
        MyPageDto.MyPageMemberPostsListRes response = postsFindService.findPostsListByBookmarkPosts(page, memberName);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 검색
    @GetMapping("/posts/search")
    public ResponseEntity<PostsDto.PostsListRes> findPostsListBySearch(@RequestParam String keyword,
                                                                       @RequestParam String[] tags,
                                                                       @Valid @Positive @RequestParam int page,
                                                                       @Valid @NotBlank @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        PostsDto.PostsListRes response = postsFindService.findPostsListByTagsAndTitle(keyword, tags, page, orderBy);
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
