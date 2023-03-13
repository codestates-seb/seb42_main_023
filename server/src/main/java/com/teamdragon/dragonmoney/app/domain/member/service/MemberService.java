package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.global.auth.dto.PrincipalDto;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    //테스트를 위한 임시 메서드
    public Member createMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByName(member.getName());

        if (optionalMember.isPresent())
            throw new BusinessLogicException(BusinessExceptionCode.USER_EXISTS);

        Member.MemberBuilder createdmember = Member.builder();
        createdmember.name(member.getName())
                .email(member.getEmail())
                .profileImage(member.getProfileImage())
                .createdAt(LocalDateTime.now())
                .intro("안녕하세요.")
                .modifiedAt(LocalDateTime.now())
                .state(Member.MemberState.ACTIVE);

        return memberRepository.save(createdmember.build());
    }

    //oauth2 로그인 할 때 사용자 정보 저장
    public Member saveMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());

        if (optionalMember.isPresent())
            return optionalMember.get();

        return memberRepository.save(member);
    }

    //닉네임 중복 확인
    public Boolean duplicatedName(Member member) {
        Optional<Member> memberOptional = memberRepository.findByName(member.getName());
        Boolean checkResult = memberOptional.isEmpty();

        return checkResult;
    }

    //회원 닉네임 저장
    public Member savedMember(Member member) {
        return memberRepository.save(member);
    }

    //회원 정보 수정(자기소개 수정)
    public Member updateMember(String name, Member member) {
        Member updatedMember = findVerifiedMemberName(name);

        Optional.ofNullable(member.getIntro())
                .ifPresent(updatedMember::setIntro);

        return memberRepository.save(updatedMember);
    }

    //특정 회원 정보 가져오기
    public Member findMember(String name) {
        return findVerifiedMemberName(name);
    }

//    //특정 회원의 글 개수
//    public Member findCount() {
//
//    }
//
//    //특정 회원이 작성한 게시글 목록
//    public Member findMemberPosts() {
//
//    }
//
//    //특정 회원이 작성한 댓글 목록
//    public Member findMemberComments() {
//
//    }
//
//    //특정 회원이 좋아요를 누른 게시글 목록
//    public Member findMemberThumbUpPosts() {
//
//    }
//
//    //특정 회원이 좋아요를 누른 댓글 목록
//    public Member findMemberThumbUpComments() {
//
//    }
//
//    //특정 회원이 북마크를 누른 게시글 목록
//    public Member findMemberBookmarks() {
//
//    }

    //회원 탈퇴
    public Member deleteMember(String name) {
        Member deletedMember = findVerifiedMemberName(name);

        deletedMember.setState(Member.MemberState.DELETED);

        return memberRepository.save(deletedMember);
    }

    //회원 이름을 통해 유무 확인
    public Member findVerifiedMemberName(String name) {
        Optional<Member> optionalAnswer = memberRepository.findByName(name);

        return optionalAnswer
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    //로그인한 이름과 비교(권한 관련. 추후 수정 예정)
    private void compareNameAndLoginName(String name) {
        if (!name.equals(getLoginUserName()))
            throw new AuthLogicException(AuthExceptionCode.USER_UNAUTHORIZED);
    }
    private String getLoginUserName() {
        String  name = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof PrincipalDto) {
            PrincipalDto principal = (PrincipalDto) authentication.getPrincipal();
            name = principal.getName();
        }

        return name;
    }
}
