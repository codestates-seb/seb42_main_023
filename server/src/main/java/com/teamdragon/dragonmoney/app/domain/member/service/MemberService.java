package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.comment.service.CommentService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyService;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PostsService postsService;
    private final CommentService commentService;
    private final ReplyService replyService;
    private final String OAUTH2_KIND = "google";

    //oauth2 로그인 할 때 존재하는 회원인지 판별
    public Boolean checkOAuthMemberName(String email) {
        Optional<Member> optionalNameDuplicateCheck
                = memberRepository.findByNameDuplicateCheckAndEmailAndOauthkind(true, email, OAUTH2_KIND);

        if (optionalNameDuplicateCheck.isPresent())
            return true;

        return false;
    }

    //조회한 이메일을 통해 이름 가져오기
    public String getNameBySearchEmail(String email) {
        Optional<Member> getMember = memberRepository.findByNameDuplicateCheckAndEmailAndOauthkind(true, email, OAUTH2_KIND);
        String name = getMember.get().getName();

        return name;
    }

    //OAuth2 신규 회원 정보 저장
    public Member saveMember(String oauthKind, String picture, String tempName, String email, List<String> authorities) {
        Member member = Member.builder()
                .oauthkind(oauthKind)
                .nameDuplicateCheck(false)
                .profileImage(picture)
                .state(Member.MemberState.ACTIVE)
                .memberRoles(authorities)
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

        Member memberOptional = findVerifiedMemberTempName(tempName);
        memberOptional.setName(name);
        memberOptional.setNameDuplicateCheck(true);

        return memberRepository.save(memberOptional);
    }

    //마이 페이지 자기소개 수정
    public Member updateMemberIntro(String name, Member member) {
        Member updatedMember = findVerifiedMemberName(name);
        updatedMember.updatedMemberIntro(member.getIntro());
        updatedMember.isModifiedNow();

        return memberRepository.save(updatedMember);
    }

    //특정 회원 정보 가져오기
    public Member findMember(String name) {
        return findVerifiedMemberName(name);
    }

    //회원 탈퇴
    public Member deleteMember(String name) {
        postsService.removePostsBtDeletedMember(name);
        commentService.removeCommentByDeletedMember(name);
        replyService.removeReplyByDeletedMember(name);

        Member deletedMember = findVerifiedMemberName(name);

        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.SELF_DELETED)
                .build();
        deletedMember.deletedMemberChangedState(deleteResult);

        return memberRepository.save(deletedMember);
    }

    //회원 이름을 통해 회원 존재의 유무 확인
    public Member findVerifiedMemberName(String name) {
        Optional<Member> optionalAnswer = memberRepository.findByName(name);

        return optionalAnswer
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    public Member findVerifiedMemberTempName(String tempName) {
        Optional<Member> optionalMember = memberRepository.findByTempName(tempName);

        return optionalMember
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    public Boolean checkDeletedName(String email) {
        Optional<Member> optionalDeletedCheck
                = memberRepository.findByEmailAndOauthkindAndState(email, OAUTH2_KIND, Member.MemberState.DELETED);

        if (optionalDeletedCheck.isPresent())
            return true;

        return false;
    }

    // 작성자 확인
    public void checkLoginMember(String loginMember, String uriMember) {
        if(!loginMember.equals(uriMember)) {
            throw new AuthLogicException(AuthExceptionCode.USER_UNAUTHORIZED);
        }
    }

    // 북마크의 uri 멤버와 로그인 멤버 비교
    public void bookmarkMemberCompareLoginMember(String loginMember, String uriMember) {
        if(!loginMember.equals(uriMember)) {
            throw new BusinessLogicException(BusinessExceptionCode.BAD_REQUEST);
        }
    }
}