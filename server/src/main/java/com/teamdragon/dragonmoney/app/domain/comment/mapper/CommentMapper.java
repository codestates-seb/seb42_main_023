package com.teamdragon.dragonmoney.app.domain.comment.mapper;


import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    Comment createDtoToComment(CommentDto.CreateReq commentDto);
    Comment updateDtoToComment(CommentDto.UpdateReq commentDto);
}
