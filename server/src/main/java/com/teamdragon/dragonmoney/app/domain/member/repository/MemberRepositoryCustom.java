package com.teamdragon.dragonmoney.app.domain.member.repository;

import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;

public interface MemberRepositoryCustom {

    MyPageDto.MyPageCount findCount(String memberName);
}
