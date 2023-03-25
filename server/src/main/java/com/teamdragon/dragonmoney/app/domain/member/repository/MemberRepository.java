package com.teamdragon.dragonmoney.app.domain.member.repository;

import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByName(String name);
    Optional<Member> findByTempName(String tempName);
    Optional<Member> findByTempAccessToken(String tempAccessToken);
    Optional<Member> findByNameDuplicateCheckAndEmailAndOauthkind(Boolean isDuplicateCheck, String email, String oauthkind);
}