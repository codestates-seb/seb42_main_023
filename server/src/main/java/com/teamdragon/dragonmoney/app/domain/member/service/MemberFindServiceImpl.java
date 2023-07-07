package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.comment.service.CommentFindService;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsFindService;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberFindServiceImpl implements MemberFindService {

    private final MemberRepository memberRepository;
    private final PostsFindService postsFindService;
    private final CommentFindService commentFindService;

    // 닉네임으로 회원 조회
    @Override
    public Member findVerifyMemberByName(String name) {
        Optional<Member> optionalAnswer = memberRepository.findByName(name);

        return optionalAnswer
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 이메일과 로그인 종류로 회원 조회
    @Override
    public Member findVerifyMemberByEmailAndOAuthKind(String email, String oAuthKind) {
        Optional<Member> optionalAnswer = memberRepository.findByEmailAndOauthkind(email, oAuthKind);

        return optionalAnswer
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 특정 회원의 글 개수
    @Override
    public MyPageDto.MyPageCount findCountInfo(String memberName) {

        return MyPageDto.MyPageCount.builder()
                .postcount(postsFindService.findPostsCountByWriter(memberName))
                .commentCount(commentFindService.findCommentCountByWriter(memberName))
                .thumbupPostCount(postsFindService.findThumbUpPostsCountByMember(memberName))
                .thumbupCommentCount(commentFindService.findThumbUpCommentCountByMember(memberName))
                .bookmarkCount(postsFindService.findBookmarkPostsCountByMember(memberName))
                .build();
    }
}
