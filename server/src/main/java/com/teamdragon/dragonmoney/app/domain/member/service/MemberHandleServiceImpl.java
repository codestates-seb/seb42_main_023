package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.bookmark.service.BookmarkHandleService;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentHandleService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleService;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyHandleService;
import com.teamdragon.dragonmoney.app.domain.thumb.service.ThumbHandleService;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberHandleServiceImpl implements MemberHandleService {

    private final MemberFindService memberFindService;
    private final MemberRepository memberRepository;

    private final PostsHandleService postsService;
    private final CommentHandleService commentHandleService;
    private final ReplyHandleService replyService;
    private final ThumbHandleService thumbHandleService;
    private final BookmarkHandleService bookmarkHandleService;

    private static final String OAUTH2_KIND = "google";

    // 신규 회원인지 판별
    @Override
    public Boolean isNewMember(String email) {
        Optional<Member> optionalNameDuplicateCheck
                = memberRepository.findByEmailAndOauthkind(email, OAUTH2_KIND);

        return optionalNameDuplicateCheck.isPresent();
    }

    // OAuth2 신규 회원 정보 저장
    @Override
    public Member createMember(String oauthKind, String picture, String tempName, String email, List<String> authorities) {
        Member member = Member.builder()
                .oauthkind(oauthKind)
                .profileImage(picture)
                .state(Member.MemberState.TEMP)
                .roles(authorities)
                .name(tempName)
                .email(email)
                .build();
        return memberRepository.save(member);
    }

    // 닉네임 중복 확인
    @Override
    public Boolean canUseName(String name) {
        Optional<Member> memberOptional = memberRepository.findByName(name);

        return memberOptional.isEmpty();
    }

    // 회원 조회 및 이름 수정
    @Override
    public Member modifyMemberName(String tempName, String name) {

        Member memberOptional = memberFindService.findVerifyMemberByName(tempName);
        memberOptional.saveMemberName(name, Member.MemberState.ACTIVE);

        return memberRepository.save(memberOptional);
    }

    // 마이 페이지 자기소개 수정
    @Override
    public Member modifyMemberIntro(String name, Member member) {
        Member updatedMember = memberFindService.findVerifyMemberByName(name);
        updatedMember.updatedMemberIntro(member.getIntro());
        updatedMember.isModifiedNow();

        return memberRepository.save(updatedMember);
    }

    // 회원 탈퇴
    @Override
    public Member removeMember(String name) {
        postsService.removePostsByDeletedMember(name);
        commentHandleService.removeCommentByDeletedMember(name);
        replyService.removeReplyByDeletedMember(name);

        Long memberId = memberFindService.findVerifyMemberByName(name).getId();
        thumbHandleService.removeAllThumbByMemberId(memberId);
        bookmarkHandleService.removeAllBookmarkByMemberId(memberId);

        Member deletedMember = memberFindService.findVerifyMemberByName(name);

        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.SELF_DELETED)
                .build();
        deletedMember.deletedMemberChangedState(deleteResult);

        return memberRepository.save(deletedMember);
    }

    // 탈퇴된 회원 복구
    @Override
    public Member changeMemberStateToActive(Map<String, Object> claims) {
        Member member =  memberFindService.findVerifyMemberByName((String) claims.get("name"));
        member.changedMemberState(Member.MemberState.ACTIVE);

        return memberRepository.save(member);
    }

    // 작성자 확인
    @Override
    public void checkLoginMember(String loginMember, String uriMember) {
        if(!loginMember.equals(uriMember)) {
            throw new AuthLogicException(AuthExceptionCode.USER_UNAUTHORIZED);
        }
    }

    // 북마크의 uri 멤버와 로그인 멤버 비교
    @Override
    public void bookmarkMemberCompareLoginMember(String loginMember, String uriMember) {
        if(!loginMember.equals(uriMember)) {
            throw new BusinessLogicException(BusinessExceptionCode.BAD_REQUEST);
        }
    }
}