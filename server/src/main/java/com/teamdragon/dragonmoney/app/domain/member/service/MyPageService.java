package com.teamdragon.dragonmoney.app.domain.member.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentService;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MyPageService {
    private final PostsService postsService;
    private final PostsRepository postsRepository;
    private final CommentRepository commentRepository;
    private final CommentService commentService;
    private static final String PAGE_ELEMENT_ORDER_BY = "latest";

    // 특정 회원의 글 개수
    public MyPageDto.MyPageCount findCountInfo(String memberName) {
        Long memberPostsCount = postsRepository.findMemberPostsCount(memberName);
        Long memberCommentCount = commentRepository.findMemberCommentCount(memberName);
        Long memberThumbUpPostsCount = postsRepository.findMemberThumbUpPostsCount(memberName);
        Long memberThumbUpCommentCount = commentRepository.findMemberThumbUpCommentCount(memberName);
        Long memberBookmarkPostsCount = postsRepository.findMemberBookmarkPostsCount(memberName);

        MyPageDto.MyPageCount myPageCount = MyPageDto.MyPageCount.builder()
                .postcount(memberPostsCount)
                .commentCount(memberCommentCount)
                .thumbupPostCount(memberThumbUpPostsCount)
                .thumbupCommentCount(memberThumbUpCommentCount)
                .bookmarkCount(memberBookmarkPostsCount)
                .build();

        return myPageCount;
    }

    // 특정 회원이 작성한 게시글 목록
    public MyPageDto.MyPageMemberPostsListRes findMemberPosts(int page, String memberName) {
        Page<Posts> postsPage = postsService.findPostsListByWriterPost(memberName, page, Posts.OrderBy.LATEST);
        return new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 특정 회원이 작성한 댓글 목록
    public MyPageDto.MyPageMemberCommentListRes findMemberComments(int page, String memberName) {
        Page<Comment> commentPage = commentService.findCommentListByMember(memberName, page, Comment.OrderBy.LATEST);
        return new MyPageDto.MyPageMemberCommentListRes(commentPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 특정 회원이 좋아요를 누른 게시글 목록
    public MyPageDto.MyPageMemberPostsListRes findMemberThumbUpPosts(int page, String memberName) {
        Page<Posts> postsPage = postsService.findPostsListByThumbUpPost(memberName, page, Posts.OrderBy.LATEST);
        return new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 특정 회원이 좋아요를 누른 댓글 목록
    public MyPageDto.MyPageMemberCommentListRes findMemberThumbUpComments(int page, String memberName) {
        Page<Comment> commentPage = commentService.findThumbUpCommentListByMember(memberName, page, Comment.OrderBy.LATEST);
        return new MyPageDto.MyPageMemberCommentListRes(commentPage, PAGE_ELEMENT_ORDER_BY);
    }

    // 특정 회원이 북마크를 누른 게시글 목록
    public MyPageDto.MyPageMemberPostsListRes findMemberBookmarks(int page, String memberName) {
        Page<Posts> postsPage = postsService.findPostsListByBookmarkPost(memberName, page, Posts.OrderBy.LATEST);
        return new MyPageDto.MyPageMemberPostsListRes(postsPage, PAGE_ELEMENT_ORDER_BY);
    }
}
