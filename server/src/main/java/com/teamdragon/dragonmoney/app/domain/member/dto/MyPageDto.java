package com.teamdragon.dragonmoney.app.domain.member.dto;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import com.teamdragon.dragonmoney.app.domain.tag.dto.TagDto;
import com.teamdragon.dragonmoney.app.global.pagenation.PageInfo;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MyPageDto {

    // 마이 페이지 회원 정보와 마이 페이지에서 조회하는 글의 개수 정보
    @Getter
    public static class MyPageRes {
        private MyPageDto.MyPageMemberInfo member;
        private MyPageDto.MyPageCount membersCount;

        public MyPageRes(MyPageMemberInfo member, MyPageCount membersCount) {
            this.member = member;
            this.membersCount = membersCount;
        }
    }

    // 마이 페이지 회원 정보 응답 데이터
    @Getter
    public static class MyPageMemberInfo {
        private Long memberId;
        private String memberName;
        private String memberImage;
        private String intro;

        public MyPageMemberInfo(Member member) {
            this.memberId = member.getId();
            this.memberName = member.getName();
            this.memberImage = member.getProfileImage();
            this.intro = member.getIntro();
        }
    }

    // 마이 페이지에서 조회할 글의 개수
    @Getter
    public static class MyPageCount {
        private Long postCount;
        private Long commentCount;
        private Long thumbupPostCount;
        private Long thumbupCommentCount;
        private Long bookmarkCount;

        @Builder
        public MyPageCount(Long postcount, Long commentCount,
                           Long thumbupPostCount, Long thumbupCommentCount,
                           Long bookmarkCount) {
            this.postCount = postcount;
            this.commentCount = commentCount;
            this.thumbupPostCount = thumbupPostCount;
            this.thumbupCommentCount = thumbupCommentCount;
            this.bookmarkCount = bookmarkCount;
        }
    }

    // 회원이 작성한 글 응답 데이터 (+페이지 정보)
    @Getter
    public static class MyPageMemberPostsListRes {
        private PageInfo pageInfo;
        private List<MyPageDto.MyPagePostsListElement> posts;

        public MyPageMemberPostsListRes(Page<Posts> postsPage, String orderBy) {
            this.pageInfo = PageInfo.of(postsPage, orderBy);

            List<Posts> postsList = postsPage.getContent();
            if (postsList != null) {
                posts = postsList.stream()
                        .map(MyPageDto.MyPagePostsListElement::new)
                        .collect(Collectors.toList());
            }
        }
    }

    // 회원이 작성한 글 목록
    @Getter
    public static class MyPagePostsListElement {
        private Long postId;
        private String title;
        private String imgUrl;
        private List<TagDto.TagName> tags;
        private String memberName;
        private LocalDateTime createdAt;
        private Long viewCount;
        private Long thumbupCount;
        private Long commentCount;

        public MyPagePostsListElement(Posts posts) {
            this.postId = posts.getId();
            if (posts.getState() == Posts.State.ACTIVE) {
                this.title = posts.getTitle();
            } else {
                this.title = posts.getState().getMessage();
            }
            this.memberName = posts.getWriter().getName();
            this.createdAt = posts.getCreatedAt();
            this.viewCount = posts.getViewCount();
            this.thumbupCount = posts.getThumbupCount();
            this.commentCount = posts.getCommentCount();
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

    // 회원이 작성한 댓글 응답 데이터 (+페이지 정보)
    @Getter
    public static class MyPageMemberCommentListRes {
        private PageInfo pageInfo;
        private List<MyPageDto.MyPageCommentListElement> comments;

        public MyPageMemberCommentListRes(Page<Comment> commentPage, String orderBy) {
            this.pageInfo = PageInfo.of(commentPage, orderBy);

            List<Comment> commentList = commentPage.getContent();
            if (commentList != null) {
                comments = commentList.stream()
                        .map(MyPageDto.MyPageCommentListElement::new)
                        .collect(Collectors.toList());
            }
        }
    }

    // 회원이 작성한 댓글 목록
    @Getter
    public static class MyPageCommentListElement {
        private Long commentId;
        private String comment;
        private Long postId;
        private String memberName;
        private LocalDateTime createdAt;
        private Long thumbupCount;
        private Long thumbdownCount;


        public MyPageCommentListElement(Comment comment) {
            this.commentId = comment.getId();
            if (comment.getState() == Comment.State.ACTIVE) {
                this.comment = comment.getContent();
            } else {
                this.comment = comment.getState().getMessage();
            }
            this.postId = comment.getPosts().getId();
            this.memberName = comment.getWriter().getName();
            this.createdAt = comment.getCreatedAt();
            this.thumbupCount = comment.getThumbupCount();
            this.thumbdownCount = comment.getThumbdownCount();
        }
    }
}
