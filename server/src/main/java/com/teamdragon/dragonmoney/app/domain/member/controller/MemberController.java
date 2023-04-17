package com.teamdragon.dragonmoney.app.domain.member.controller;

import com.teamdragon.dragonmoney.app.domain.member.dto.MemberDto;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.mapper.MemberMapper;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberHandleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RequiredArgsConstructor
@Validated
@RequestMapping("/members")
@RestController
public class MemberController {
    private final MemberFindService memberFindService;
    private final MemberHandleServiceImpl memberHandleService;
    private final MemberMapper memberMapper;

    // 닉네임 중복 확인
    @PostMapping("/duplicated-name")
    public ResponseEntity<MemberDto.DuplicatedRes> modifyMemberName(@Valid @RequestBody MemberDto.DuplicatedReq post) {
        Boolean checkDuplicatedName = memberHandleService.canUseName(post.getName());

        if(checkDuplicatedName == true) {
            memberHandleService.modifyMemberName(post.getTempName(), post.getName());
        }

        MemberDto.DuplicatedRes response = new MemberDto.DuplicatedRes(checkDuplicatedName);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 회원 정보 수정(자기소개 수정)
    @PatchMapping("/{member-name}")
    public ResponseEntity<MemberDto.IntroResponse> modifyMember(@PathVariable("member-name") String name,
                                       @Valid @RequestBody MemberDto.PatchReq patch,
                                       @AuthenticationPrincipal Principal principal) {
        memberFindService.findVerifyMemberByName(name);
        memberHandleService.checkLoginMember(principal.getName(), name);

        Member member = memberMapper.pathDtoToMember(patch);
        Member updatedMember = memberHandleService.modifyMemberIntro(name, member);
        MemberDto.IntroResponse response = memberMapper.introResponseDtoToMember(updatedMember);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 특정 회원 정보 가져오기
    @GetMapping("/{member-name}")
    public ResponseEntity<MyPageDto.MyPageRes> findMemberDetails(@PathVariable("member-name") String memberName) {
        Member getMember = memberFindService.findVerifyMemberByName(memberName);

        MyPageDto.MyPageMemberInfo myPageResponse = memberMapper.myPageResponseDtoToMember(getMember);
        MyPageDto.MyPageCount postsPage = memberFindService.findCountInfo(memberName);
        MyPageDto.MyPageRes response = new MyPageDto.MyPageRes(myPageResponse, postsPage);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 회원 탈퇴
    @DeleteMapping("/{member-name}")
    public ResponseEntity<Void> removeMember(@PathVariable("member-name") String name,
                                             @AuthenticationPrincipal Principal principal) {
        memberFindService.findVerifyMemberByName(name);
        memberHandleService.checkLoginMember(principal.getName(), name);

        memberHandleService.removeMember(principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}