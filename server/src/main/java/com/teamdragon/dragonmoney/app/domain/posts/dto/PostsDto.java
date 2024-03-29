package com.teamdragon.dragonmoney.app.domain.posts.dto;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import com.teamdragon.dragonmoney.app.domain.tag.dto.TagDto;
import com.teamdragon.dragonmoney.app.global.pagenation.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.teamdragon.dragonmoney.app.domain.image.dto.ImageDto.*;

public class PostsDto {

    @Getter
    @NoArgsConstructor
    public static class CreateReq {
        private CreatePostsImagesReq saveImages;
        @NotBlank
        @Length(min=5, max=20)
        private String title;
        @NotBlank
        @Length(min=10, max=30000)
        private String content;
        @Size(min = 1, max = 5)
        private List<TagDto.TagName> tagNames;

        @Builder
        public CreateReq(CreatePostsImagesReq saveImages, String title,
                         String content, List<TagDto.TagName> tagNames) {
            this.saveImages = saveImages;
            this.title = title;
            this.content = content;
            this.tagNames = tagNames;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class UpdateReq {
        private UpdatePostsImagesReq saveImages;
        @NotBlank
        @Length(min=5, max=20)
        private String title;
        @NotBlank
        @Length(min=10, max=30000)
        private String content;
        @Size(min = 1, max = 5)
        private List<TagDto.TagName> tagNames;

        @Builder
        public UpdateReq(UpdatePostsImagesReq saveImages, String title,
                         String content, List<TagDto.TagName> tagNames) {
            this.saveImages = saveImages;
            this.title = title;
            this.content = content;
            this.tagNames = tagNames;
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreatePostsImagesReq {
        private List<ImageDto> addedImages;
        private List<ImageDto> removedImages;
    }

    @Getter
    @NoArgsConstructor
    public static class UpdatePostsImagesReq {
        private List<ImageDto> remainImages;
        private List<ImageDto> addedImages;
        private List<ImageDto> removedImages;

        @Builder
        public UpdatePostsImagesReq(List<ImageDto> remainImages,
                                    List<ImageDto> addedImages,
                                    List<ImageDto> removedImages) {
            this.remainImages = remainImages;
            this.addedImages = addedImages;
            this.removedImages = removedImages;
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
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
            if (postsList != null && !postsList.isEmpty() ) {
                this.posts = postsList.stream()
                        .map(PostsListElement::new)
                        .collect(Collectors.toList());
            } else {
                this.posts = new ArrayList<>();
            }
        }
    }

    @Getter
    public static class BestAwardsRes {
        private PageInfo pageInfo;
        private List<PostsListElement> posts;

        public BestAwardsRes(Page<Posts> postsPage, String orderBy) {
            this.pageInfo = PageInfo.of(postsPage, orderBy);

            List<Posts> postsList = postsPage.getContent();
            if (postsList != null && !postsList.isEmpty()) {
                this.posts = postsList.stream()
                        .map(PostsListElement::new)
                        .collect(Collectors.toList());
            } else {
                this.posts = new ArrayList<>();
            }
        }
    }

    @Getter
    @NoArgsConstructor
    public static class WeeklyPopularRes {
        private List<PostsListElement> posts;
        private LocalDateTime start;
        private LocalDateTime end;

        @Builder
        public WeeklyPopularRes(List<Posts> posts, LocalDateTime start, LocalDateTime end) {
            if (posts != null && !posts.isEmpty()) {
                this.posts = posts.stream()
                        .map(PostsListElement::new)
                        .collect(Collectors.toList());
            } else {
                this.posts = new ArrayList<>();
            }
            this.start = start;
            this.end = end;
        }
    }

    @Getter
    public static class RecommendPostsListRes {
        private List<PostsListElement> recommends;

        public RecommendPostsListRes(List<Posts> posts) {
            if (posts != null && !posts.isEmpty()) {
                this.recommends = posts.stream()
                        .map(PostsListElement::new)
                        .collect(Collectors.toList());
            } else {
                this.recommends = new ArrayList<>();
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
        private Long commentCount;
        private Long viewCount;
        private Long thumbupCount;

        public PostsListElement(Posts posts) {
            this.postId = posts.getId();
            this.title = posts.getTitle();
            this.memberName = posts.getWriter().getName();
            this.createdAt = posts.getCreatedAt();
            this.commentCount = posts.getCommentCount();
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
        private Long commentCount;
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
            this.commentCount = posts.getCommentCount();
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
            this.commentCount = posts.getCommentCount();
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
            this.isBookmarked = (isBookmarked != null);
            this.isThumbup = (isThumbup != null);
            this.isThumbdown = (isThumbdown != null);
        }
    }
}
