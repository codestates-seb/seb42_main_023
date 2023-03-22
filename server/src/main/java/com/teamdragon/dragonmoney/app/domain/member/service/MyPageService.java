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

    // 특정 회원의 글 개수
    public MyPageDto.MyPageCount findCount(String memberName) {
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
    public Page<Posts> findMemberPosts(int page, String memberName) {
        return postsService.findPostsListByWriterPost(memberName, page, Posts.OrderBy.LATEST);
    }

    // 특정 회원이 작성한 댓글 목록
    public Page<Comment> findMemberComments(int page, String memberName) {
        return commentService.findCommentListByWriterComment(memberName, page, Comment.OrderBy.LATEST);
    }

    // 특정 회원이 좋아요를 누른 게시글 목록
    public Page<Posts> findMemberThumbUpPosts(int page, String memberName) {
        return postsService.findPostsListByThumbUpPost(memberName, page, Posts.OrderBy.LATEST);
    }

    // 특정 회원이 좋아요를 누른 댓글 목록
    public Page<Comment> findMemberThumbUpComments(int page, String memberName) {
        return commentService.findPostsListByThumbUpComment(memberName, page, Comment.OrderBy.LATEST);
    }

    // 특정 회원이 북마크를 누른 게시글 목록
    public Page<Posts> findMemberBookmarks(int page, String memberName) {
        return postsService.findPostsListByBookmarkPost(memberName, page, Posts.OrderBy.LATEST);
    }
}
