package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.global.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    //테스트를 위한 임시 메서드
    public Member createMemberTemp(Member member) {
        Optional<Member> optionalMember = memberRepository.findByName(member.getName());

        if (optionalMember.isPresent())
            throw new BusinessLogicException(BusinessExceptionCode.USER_EXISTS);

        Member createdmember = Member.builder()
                .name(member.getName())
                .oauthkind("google")
                .nameDuplicateCheck(true)
                .email(member.getEmail())
                .profileImage(member.getProfileImage())
                .state(Member.MemberState.ACTIVE)
                .build();

        return memberRepository.save(createdmember);
    }

    //oauth2 로그인 할 때 존재하는 회원인지 판별
    public Boolean checkOAuthMemberName(String oauthKind, String email) {
        //사용자 닉네임 설정 여부, 이메일, oauthkind를 같이 조회
        Optional<Member> optionalNameDuplicateCheck = memberRepository.findByNameDuplicateCheckAndEmailAndOauthkind(true, email, oauthKind);

        //회원이 있을 때
        if (optionalNameDuplicateCheck.isPresent())
            return true;

        return false;
    }

    //조회한 이메일을 통해 이름 가져오기
    public String getNameBySearchEmail(String email) {
        Optional<Member> getMember = memberRepository.findByEmailAndOauthkind(email, "google");
        String name = getMember.get().getName();

        return name;
    }

    //OAuth2 신규 회원 정보 저장
    public Member saveMember(String oauthKind, String picture, String tempName, String email) {
        Member member = Member.builder()
                .oauthkind(oauthKind)
                .nameDuplicateCheck(false)
                .profileImage(picture)
                .tempName(tempName)
                .email(email)
                .build();
        return memberRepository.save(member);
    }

    //닉네임 중복 확인하는 페이지에서 중복 확인
    public Boolean duplicatedName(String name) {
        Optional<Member> memberOptional = memberRepository.findByName(name);

        return memberOptional.isEmpty();
    }

    //uuid를 통해 회원 조회 및 이름 수정
    public Member updateMemberName(String tempName, String name) {
        Member memberOptional = memberRepository.findByTempName(tempName);

        memberOptional.setName(name);
        memberOptional.setNameDuplicateCheck(true);

        return memberRepository.save(memberOptional);
    }

    //마이 페이지 자기소개 수정
    public Member updateMemberIntro(String name, Member member) {
        Member updatedMember = findVerifiedMemberName(name);

        updatedMember.setIntro(member.getIntro());

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

        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.DELETED_BY_REPORT)
                .build();

        deletedMember.setDeleteResult(deleteResult);

        return memberRepository.save(deletedMember);
    }

    //회원 이름을 통해 회원 존재의 유무 확인
    public Member findVerifiedMemberName(String name) {
        Optional<Member> optionalAnswer = memberRepository.findByName(name);

        return optionalAnswer
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

//    //로그인한 이름과 비교(권한 관련. 추후 수정 예정)
//    private void compareNameAndLoginName(String name) {
//        if (!name.equals(getLoginUserName()))
//            throw new AuthLogicException(AuthExceptionCode.USER_UNAUTHORIZED);
//    }
//    private String getLoginUserName() {
//        String  name = null;
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof PrincipalDto) {
//            PrincipalDto principal = (PrincipalDto) authentication.getPrincipal();
//            name = principal.getName();
//        }
//
//        return name;
//    }
}
