package com.teamdragon.dragonmoney.app.domain.member.mapper;

import com.teamdragon.dragonmoney.app.domain.member.dto.MemberDto;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member pathDtoToMember(MemberDto.PatchIntroReq patch);
    MemberDto.IntroResponse introResponseDtoToMember(Member member);
    MyPageDto.MyPageMemberInfo myPageResponseDtoToMember(Member member);
}