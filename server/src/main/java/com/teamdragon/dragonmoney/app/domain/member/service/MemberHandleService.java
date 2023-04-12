package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;

import java.util.List;

public interface MemberHandleService {

    // oAuth2 로그인 할 때 존재하는 회원인지 판별
    Boolean checkOAuthMemberByEmail(String email);

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

    // 탈퇴한 회원 재 가입시 존재하는 회원인지 판별
    Boolean isDeletedMemberByEmail(String email);

    // 조회한 이메일을 통해 이름 가져오기
    String findMemberNameByEmail(String email);

    // 작성자 확인
    void checkLoginMember(String loginMember, String uriMember);

    // 북마크의 uri 멤버와 로그인 멤버 비교
    void bookmarkMemberCompareLoginMember(String loginMember, String uriMember);

}
