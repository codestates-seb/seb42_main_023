package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.service.BookmarkHandleService;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentHandleService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleServiceImpl;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyHandleServiceImpl;
import com.teamdragon.dragonmoney.app.domain.thumb.service.ThumbService;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberHandleServiceImpl implements MemberHandleService {

    private final MemberFindService memberFindService;
    private final MemberRepository memberRepository;

    private final PostsHandleServiceImpl postsService;
    private final CommentHandleService commentHandleService;
    private final ReplyHandleServiceImpl replyService;
    private final ThumbService thumbService;
    private final BookmarkHandleService bookmarkHandleService;

    private static final String OAUTH2_KIND = "google";

    // oAuth2 로그인 할 때 존재하는 회원인지 판별
    public Boolean checkOAuthMemberByEmail(String email) {
        Optional<Member> optionalNameDuplicateCheck
                = memberRepository.findByNameDuplicateCheckAndEmailAndOauthkind(true, email, OAUTH2_KIND);

        return optionalNameDuplicateCheck.isPresent();
    }

    // OAuth2 신규 회원 정보 저장
    public Member createMember(String oauthKind, String picture, String tempName, String email, List<String> authorities) {
        Member member = Member.builder()
                .oauthkind(oauthKind)
                .nameDuplicateCheck(false)
                .profileImage(picture)
                .state(Member.MemberState.ACTIVE)
                .roles(authorities)
                .tempName(tempName)
                .email(email)
                .build();
        return memberRepository.save(member);
    }

    // 닉네임 중복 확인
    public Boolean canUseName(String name) {
        Optional<Member> memberOptional = memberRepository.findByName(name);

        return memberOptional.isEmpty();
    }

    // 회원 조회 및 이름 수정
    public Member modifyMemberName(String tempName, String name) {

        Member memberOptional = memberFindService.findVerifiedMemberTempName(tempName);
        memberOptional.saveMemberName(name, true);

        return memberRepository.save(memberOptional);
    }

    // 마이 페이지 자기소개 수정
    public Member modifyMemberIntro(String name, Member member) {
        Member updatedMember = memberFindService.findVerifiedMemberName(name);
        updatedMember.updatedMemberIntro(member.getIntro());
        updatedMember.isModifiedNow();

        return memberRepository.save(updatedMember);
    }

    // 회원 탈퇴
    public Member removeMember(String name) {
        postsService.removePostsByDeletedMember(name);
        commentHandleService.removeCommentByDeletedMember(name);
        replyService.removeReplyByDeletedMember(name);

        Long memberId = memberFindService.findMember(name).getId();
        thumbService.removeAllThumbByMemberId(memberId);
        bookmarkHandleService.removeAllBookmarkByMemberId(memberId);

        Member deletedMember = memberFindService.findVerifiedMemberName(name);

        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.SELF_DELETED)
                .build();
        deletedMember.deletedMemberChangedState(deleteResult);

        return memberRepository.save(deletedMember);
    }

    // 탈퇴한 회원 재 가입시 존재하는 회원인지 판별
    public Boolean isDeletedMemberByEmail(String email) {
        Optional<Member> optionalDeletedCheck
                = memberRepository.findByEmailAndOauthkindAndState(email, OAUTH2_KIND, Member.MemberState.DELETED);
        return optionalDeletedCheck.isPresent();
    }

    // 조회한 이메일을 통해 이름 가져오기
    public String findMemberNameByEmail(String email) {
        Optional<Member> getMember = memberRepository.findByNameDuplicateCheckAndEmailAndOauthkind(true, email, OAUTH2_KIND);
        String name = getMember.get().getName();

        return name;
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