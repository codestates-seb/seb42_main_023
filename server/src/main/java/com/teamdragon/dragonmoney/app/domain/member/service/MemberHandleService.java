package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

import java.util.List;
import java.util.Map;

public interface MemberHandleService {

    // 신규 회원인지 판별
    Boolean isNewMember(String email);

    // OAuth2 신규 회원 정보 저장
    Member createMember(String oauthKind, String picture, String tempName, String email, List<String> authorities);

    // 닉네임 중복 확인
    Boolean canUseName(String name);

    // 회원 조회 및 이름 수정
    Member modifyMemberName(String tempName, String name);

    // 마이 페이지 자기소개 수정
    Member modifyMemberIntro(String name, Member member);

    // 회원 탈퇴
    Member removeMember(String name);

    // 탈퇴된 회원 복구
    Member changeMemberStateToActive(Map<String, Object> claims);

    // 작성자 확인
    void checkLoginMember(String loginMember, String uriMember);

    // 북마크의 uri 멤버와 로그인 멤버 비교
    void bookmarkMemberCompareLoginMember(String loginMember, String uriMember);

}
