package com.teamdragon.dragonmoney.app.domain.member.controller;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.dto.MemberDto;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.mapper.MemberMapper;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.domain.member.service.MyPageService;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final MyPageService myPageService;
    private final String PAGE_ELEMENT_ORDER_BY = "latest";
    private final String PAGE_ELEMENT_ORDER_BY_PROPERTY = "createdAt";

    //회원가입 (포스트맨 테스트를 위한 임시 메서드)
    @PostMapping
    public ResponseEntity postMemberTemp(@Valid @RequestBody MemberDto.PostTemp post) {
        memberService.createMemberTemp(memberMapper.postDtoToMemberTemp(post));

        URI location = createURI("/members", 1L);

        return ResponseEntity.created(location).build();
    }
    public static URI createURI(String url, long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(url + "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }

    //닉네임 중복 확인
    @PostMapping("/duplicated-name")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post post) {

        Map<String,Boolean> response = new HashMap<>();
//        MemberDto.duplicatedPost response = new MemberDto.duplicatedPost();

        if (!memberService.duplicatedName(post.getName())) {         //같은 닉네임이 있을 때
//            response.setUseable(false);
            response.put("useable", false);
        } else {                                                     //같은 닉네임이 없을 때
            memberService.updateMemberName(post.getTempName(), post.getName());
//            response.setUseable(true);
            response.put("useable", true);
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //회원 정보 수정(자기소개 수정)
    @PatchMapping("/{member-name}")
    public ResponseEntity patchMember(@PathVariable("member-name") String name,
                                      @Valid @RequestBody MemberDto.Patch patch,
                                      @AuthenticationPrincipal Principal principal) {

        Member loginMember = memberService.findMember(principal.getName());

        Member member = memberMapper.pathDtoToMember(patch);
        Member updatedMember = memberService.updateMemberIntro(name, member);
        MemberDto.IntroResponse response = memberMapper.introResponseDtoToMember(updatedMember);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //특정 회원 정보 가져오기
    @GetMapping("/{member-name}")
    public ResponseEntity getMember(@PathVariable("member-name") String memberName) {
        Member getMember = memberService.findMember(memberName);

        MyPageDto.MyPageMemberInfo myPageResponse = memberMapper.myPageResponseDtoToMember(getMember);
        MyPageDto.MyPageCount postsPage = myPageService.findCount(memberName);
        MyPageDto.MyPageRes response = new MyPageDto.MyPageRes(myPageResponse, postsPage);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //특정 회원이 작성한 게시글 목록
    @GetMapping("/{member-name}/posts")
    public ResponseEntity getMemberPosts(@PathVariable("member-name") String memberName,
                                         @Valid @RequestParam int page) {
        Page<Posts> postsPage = myPageService.findMemberPosts(page, memberName);
        MyPageDto.MyPageMemberPostsListRes response
                = new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //특정 회원이 작성한 댓글 목록
    @GetMapping("/{member-name}/comments")
    public ResponseEntity getMemberComments(@PathVariable("member-name") String memberName,
                                            @Valid @RequestParam int page) {
        Page<Comment> commentPage = myPageService.findMemberComments(page, memberName);
        MyPageDto.MyPageMemberCommentListRes response
                = new MyPageDto.MyPageMemberCommentListRes(commentPage, PAGE_ELEMENT_ORDER_BY);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //특정 회원이 좋아요를 누른 게시글 목록
    @GetMapping("/{member-name}/thumbup/posts")
    public ResponseEntity getMemberThumbUpPosts(@PathVariable("member-name") String memberName,
                                                @Valid @RequestParam int page) {
        Page<Posts> postsPage = myPageService.findMemberThumbUpPosts(page, memberName);
        MyPageDto.MyPageMemberPostsListRes response
                = new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //특정 회원이 좋아요를 누른 댓글 목록
    @GetMapping("/{member-name}/thumbup/comments")
    public ResponseEntity getMemberThumbUpComments(@PathVariable("member-name") String memberName,
                                                   @Valid @RequestParam int page) {
        Page<Comment> commentPage = myPageService.findMemberThumbUpComments(page, memberName);
        MyPageDto.MyPageMemberCommentListRes response
                = new MyPageDto.MyPageMemberCommentListRes(commentPage, PAGE_ELEMENT_ORDER_BY);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //특정 회원이 북마크를 누른 게시글 목록
    @GetMapping("/{member-name}/bookmark")
    public ResponseEntity getMemberBookmarks(@PathVariable("member-name") String memberName,
                                             @Valid @RequestParam int page) {
        Page<Posts> postsPage = myPageService.findMemberBookmarks(page, memberName);
        MyPageDto.MyPageMemberPostsListRes response
                = new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //회원 탈퇴
    @DeleteMapping("/{member-name}")
    public ResponseEntity deleteMember(@PathVariable("member-name") String name) {
        memberService.deleteMember(name);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}