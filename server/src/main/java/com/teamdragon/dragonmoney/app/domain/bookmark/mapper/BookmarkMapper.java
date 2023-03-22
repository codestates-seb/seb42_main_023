package com.teamdragon.dragonmoney.app.domain.bookmark.mapper;

import com.teamdragon.dragonmoney.app.domain.bookmark.dto.BookmarkDto;
import com.teamdragon.dragonmoney.app.domain.member.dto.MemberDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BookmarkMapper {
    BookmarkDto bookmarkReqDtoToBookmark(Member member);
}
