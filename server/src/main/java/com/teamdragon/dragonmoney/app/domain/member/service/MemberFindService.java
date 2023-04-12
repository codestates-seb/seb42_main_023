package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

public interface MemberFindService {

    Member findMember(String name);

    // 임시 닉네임으로 회원 조회
    Member findVerifiedMemberTempName(String tempName);

    // 회원 이름을 통해 회원 존재의 유무 확인
    Member findVerifiedMemberName(String name);
}
