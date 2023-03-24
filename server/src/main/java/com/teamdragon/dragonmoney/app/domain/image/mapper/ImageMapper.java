package com.teamdragon.dragonmoney.app.domain.image.mapper;

import com.teamdragon.dragonmoney.app.domain.image.dto.ImageDto;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageMapper {

    @Mapping(source = "id", target = "imageId")
    @Mapping(source = "fileName", target = "imageName")
    ImageDto.ImageResponse imageToImageResponse(Image image);
    List<Image> imageDtoListToImageList(List<PostsDto.ImageDto> imageDtos);
    @Mapping(source = "imageId", target = "id")
    @Mapping(source = "imageName", target = "fileName")
    Image imageDtoToImage(PostsDto.ImageDto imageDto);
}
