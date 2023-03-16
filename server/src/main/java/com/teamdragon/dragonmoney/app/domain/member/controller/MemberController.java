package com.teamdragon.dragonmoney.app.domain.member.controller;

import com.teamdragon.dragonmoney.app.domain.member.dto.MemberDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.mapper.MemberMapper;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;


@Slf4j
@CrossOrigin
@RequestMapping("/members")
@RequiredArgsConstructor
@RestController
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

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

        if (!memberService.duplicatedName(post.getName())) {         //같은 닉네임이 있을 때
            response.put("useable", false);
        } else {                                                     //같은 닉네임이 없을 때
            memberService.updateMemberName(post.getTempName(), post.getName());
            response.put("useable", true);
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //회원 정보 수정(자기소개 수정)
    @PatchMapping("/{member-name}")
    public ResponseEntity patchMember(@PathVariable("member-name") String name,
                                      @Valid @RequestBody MemberDto.Patch patch) {

        Member member = memberMapper.pathDtoToMember(patch);
        Member updatedMember = memberService.updateMemberIntro(name, member);
        MemberDto.IntroResponse response = memberMapper.introResponseDtoToMember(updatedMember);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //특정 회원 정보 가져오기
    @GetMapping("/{member-name}")
    public ResponseEntity getMember(@PathVariable("member-name") String name) {
        Member getMember = memberService.findMember(name);
        MemberDto.MyPageResponse myPageResponse = memberMapper.myPageResponseDtoToMember(getMember);

        return ResponseEntity.status(HttpStatus.OK).body(myPageResponse);
    }

    //    //특정 회원의 글 개수
//    @GetMapping("/{member-name}/count")
//    public ResponseEntity getCount(@PathVariable("member-name") @Positive Long id) {
//
//    }
//
//    //특정 회원이 작성한 게시글 목록
//    @GetMapping("/{member-name}/posts")
//    public ResponseEntity getMemberPosts(@PathVariable("member-name") @Positive Long id) {
//
//    }
//
//    //특정 회원이 작성한 댓글 목록
//    @GetMapping("/{member-name}/comments")
//    public ResponseEntity getMemberComments(@PathVariable("member-name") @Positive Long id) {
//
//    }
//
//    //특정 회원이 좋아요를 누른 게시글 목록
//    @GetMapping("/{member-name}/thumbup/posts")
//    public ResponseEntity getMemberThumbUpPosts(@PathVariable("member-name") @Positive Long id) {
//
//    }
//
//    //특정 회원이 좋아요를 누른 댓글 목록
//    @GetMapping("/{member-name}/thumbup/comments")
//    public ResponseEntity getMemberThumbUpComments(@PathVariable("member-name") @Positive Long id) {
//
//    }
//
//    //특정 회원이 북마크를 누른 게시글 목록
//    @GetMapping("/{member-name}/bookmark")
//    public ResponseEntity getMemberBookmarks(@PathVariable("member-name") @Positive Long id) {
//
//    }
//
    //회원 탈퇴
    @DeleteMapping("/{member-name}")
    public ResponseEntity deleteMember(@PathVariable("member-name") String name) {
        memberService.deleteMember(name);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}