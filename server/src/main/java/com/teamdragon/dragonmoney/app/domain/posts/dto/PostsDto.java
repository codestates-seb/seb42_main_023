package com.teamdragon.dragonmoney.app.domain.posts.dto;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import com.teamdragon.dragonmoney.app.domain.tag.dto.TagDto;
import com.teamdragon.dragonmoney.app.global.pagenation.PageInfo;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.teamdragon.dragonmoney.app.domain.image.dto.ImageDto.*;

public class PostsDto {

    @Getter
    public static class CreateReq {
        private CreatePostsImagesReq saveImages;
        @NotBlank
        @Length(min=5, max=20)
        private String title;
        @NotBlank
        @Length(min=10, max=30000)
        private String content;
        private List<TagDto.TagName> tagNames;
    }

    @Getter
    public static class UpdateReq {
        private UpdatePostsImagesReq saveImages;
        @NotBlank
        @Length(min=5, max=20)
        private String title;
        @NotBlank
        @Length(min=10, max=30000)
        private String content;
        private List<TagDto.TagName> tagNames;
    }

    @Getter
    public static class CreatePostsImagesReq {
        private List<ImageDto> addedImages;
        private List<ImageDto> removedImages;
    }

    @Getter
    public static class UpdatePostsImagesReq {
        private List<ImageDto> remainImages;
        private List<ImageDto> addedImages;
        private List<ImageDto> removedImages;
    }

    @Getter
    public static class ImageDto {
        @NotNull
        @Positive
        private Long imageId;
        @NotBlank
        private String imageName;
    }

    @Getter
    public static class CreateRes{
        private Long postsId;

        public CreateRes(Long postsId) {
            this.postsId = postsId;
        }
    }

    @Getter
    public static class UpdateRes{
        private Long postsId;

        public UpdateRes(Long postsId) {
            this.postsId = postsId;
        }
    }


    @Getter
    public static class PostsListRes {
        private PageInfo pageInfo;
        private List<PostsListElement> posts;

        public PostsListRes(Page<Posts> postsPage, String orderBy) {
            this.pageInfo = PageInfo.of(postsPage, orderBy);

            List<Posts> postsList = postsPage.getContent();
            if (postsList != null) {
                posts = postsList.stream()
                        .map(PostsListElement::new)
                        .collect(Collectors.toList());
            }
        }
    }

    @Getter
    public static class PostsListElement {
        private Long postId;
        private String title;
        private String imgUrl;
        private List<TagDto.TagName> tags;
        private String memberName;
        private LocalDateTime createdAt;
        private Long viewCount;
        private Long thumbupCount;

        public PostsListElement(Posts posts) {
            this.postId = posts.getId();
            this.title = posts.getTitle();
            this.memberName = posts.getWriter().getName();
            this.createdAt = posts.getCreatedAt();
            this.viewCount = posts.getViewCount();
            this.thumbupCount = posts.getThumbupCount();
            List<Image> images = posts.getImages();
            if (images != null && images.size() != 0) {
                this.imgUrl = images.get(0).getUrl();
            }
            List<PostsTag> postsTags = posts.getPostsTags();
            this.tags = new ArrayList<>();
            if (postsTags != null) {
                for (PostsTag postsTag : postsTags) {
                    this.tags.add(new TagDto.TagName(postsTag.getTag()));
                }
            }
        }
    }

    @Getter
    public static class PostsDetailRes {
        private Long postId;
        private String memberName;
        private String memberImage;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Boolean isModified;
        private Long viewCount;
        private Long thumbupCount;
        private Long thumbDownCount;
        private String title;
        private String content;
        private List<ImageResponse> images;
        private List<String> tags;
        private Boolean isBookmarked;
        private Boolean isThumbup;
        private Boolean isThumbdown;

        // 미 로그인 유저용
        public PostsDetailRes(Posts posts) {
            this.postId = posts.getId();
            this.memberName = posts.getWriter().getName();
            this.memberImage = posts.getWriter().getProfileImage();
            this.createdAt = posts.getCreatedAt();
            this.modifiedAt = posts.getModifiedAt();
            this.isModified = this.createdAt != modifiedAt;
            this.viewCount = posts.getViewCount();
            this.thumbupCount = posts.getThumbupCount();
            this.thumbDownCount = posts.getThumbdownCount();
            this.title = posts.getTitle();
            this.content = posts.getContent();
            this.images = new ArrayList<>();
            for (Image image : posts.getImages()) {
                this.images.add(new ImageResponse(image.getId(), image.getFileName()));
            }
            this.tags = new ArrayList<>();
            for (PostsTag postsTag : posts.getPostsTags()) {
                tags.add(postsTag.getTag().getName());
            }
        }

        // 로그인 유저용
        public PostsDetailRes(Posts posts, Long isBookmarked, Long isThumbup, Long isThumbdown) {
            this.postId = posts.getId();
            this.memberName = posts.getWriter().getName();
            this.memberImage = posts.getWriter().getProfileImage();
            this.createdAt = posts.getCreatedAt();
            this.modifiedAt = posts.getModifiedAt();
            this.isModified = this.createdAt != modifiedAt;
            this.viewCount = posts.getViewCount();
            this.thumbupCount = posts.getThumbupCount();
            this.thumbDownCount = posts.getThumbdownCount();
            this.title = posts.getTitle();
            this.content = posts.getContent();
            this.images = new ArrayList<>();
            for (Image image : posts.getImages()) {
                this.images.add(new ImageResponse(image.getId(), image.getFileName()));
            }
            this.tags = new ArrayList<>();
            for (PostsTag postsTag : posts.getPostsTags()) {
                   tags.add(postsTag.getTag().getName());
            }
            this.isBookmarked = isBookmarked != null;
            this.isThumbup = isThumbup != null;
            this.isThumbdown = isThumbdown != null;
        }
    }
}
