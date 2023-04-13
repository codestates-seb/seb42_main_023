package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
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
    private final PostsRepository postsRepository;
    private final CommentRepository commentRepository;

    // 임시 닉네임으로 회원 조회
    @Override
    public Member findVerifiedMemberTempName(String tempName) {
        Optional<Member> optionalMember = memberRepository.findByTempName(tempName);

        return optionalMember
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 닉네임으로 회원 조회
    @Override
    public Member findVerifiedMemberName(String name) {
        Optional<Member> optionalAnswer = memberRepository.findByName(name);

        return optionalAnswer
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 특정 회원의 글 개수
    @Override
    public MyPageDto.MyPageCount findCountInfo(String memberName) {

        return MyPageDto.MyPageCount.builder()
                .postcount(postsRepository.findMemberPostsCount(memberName))
                .commentCount(commentRepository.findMemberCommentCount(memberName))
                .thumbupPostCount(postsRepository.findMemberThumbUpPostsCount(memberName))
                .thumbupCommentCount(commentRepository.findMemberThumbUpCommentCount(memberName))
                .bookmarkCount(postsRepository.findMemberBookmarkPostsCount(memberName))
                .build();
    }
}
