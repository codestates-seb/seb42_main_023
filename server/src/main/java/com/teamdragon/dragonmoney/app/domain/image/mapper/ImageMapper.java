package com.teamdragon.dragonmoney.app.domain.image.mapper;

import com.teamdragon.dragonmoney.app.domain.image.dto.ImageDto;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageMapper {
    ImageDto.ImageResponse imageToImageResponse(Image image);
    Image imageDtoToImage(PostsDto.ImageDto imageDto);
    List<Image> imageDtoListToImageList(List<PostsDto.ImageDto> imageDtos);
}
