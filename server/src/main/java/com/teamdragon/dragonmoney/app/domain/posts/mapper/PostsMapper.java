package com.teamdragon.dragonmoney.app.domain.posts.mapper;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import com.teamdragon.dragonmoney.app.domain.tag.dto.TagDto;
import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostsMapper {

    @Mapping(source = "saveImages.addedImages", target = "images")
    @Mapping(source = "tagNames", target = "postsTags")
    Posts postDtoToPosts(PostsDto.CreateReq createReqDto);

    @Mapping(source = "saveImages.addedImages", target = "images")
    @Mapping(source = "tagNames", target = "postsTags")
    Posts patchDtoToPosts(PostsDto.UpdateReq updateReqDto);

    // 태그 매핑
    PostsTag tagToPostsTag(Tag tag);

    @Mapping(source = "tagName", target = "name")
    Tag tagDtoToTag(TagDto.TagName tagDto);

    // 이미지 매핑
    @Mapping(source = "imageId", target = "id")
    @Mapping(source = "imageName", target = "fileName")
    Image imageDtoToImage(PostsDto.ImageDto imageDto);

    @Mapping(source = "imageId", target = "id")
    @Mapping(source = "imageName", target = "fileName")
    List<Image> imageDtoListToImageList(List<PostsDto.ImageDto> imageDtos);
}
