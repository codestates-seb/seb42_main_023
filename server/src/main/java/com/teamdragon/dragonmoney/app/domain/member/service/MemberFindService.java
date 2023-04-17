package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

public interface MemberFindService {

    // 임시 닉네임으로 회원 조회
    Member findVerifyMemberByTempName(String tempName);

    // 닉네임으로 회원 조회
    Member findVerifyMemberByName(String name);

    // 특정 회원의 글 개수
    MyPageDto.MyPageCount findCountInfo(String memberName);
}
