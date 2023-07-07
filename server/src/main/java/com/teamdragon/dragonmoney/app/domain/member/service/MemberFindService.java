package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

public interface MemberFindService {

    // 닉네임으로 회원 조회
    Member findVerifyMemberByName(String name);

    // 이메일과 로그인 종류로 회원 조회
    Member findVerifyMemberByEmailAndOAuthKind(String email, String oAuthKind);

    // 특정 회원의 글 개수
    MyPageDto.MyPageCount findCountInfo(String memberName);
}
