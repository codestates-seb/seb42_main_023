package com.teamdragon.dragonmoney.app.domain.reply.mapper;

import com.teamdragon.dragonmoney.app.domain.reply.dto.ReplyDto;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReplyMapper {

    Reply createDtoToReply(ReplyDto.CreateReq replyDto);
    Reply updateDtoToReply(ReplyDto.UpdateReq replyDto);
}
