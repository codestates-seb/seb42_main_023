package com.teamdragon.dragonmoney.app.domain.common.service;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.category.repository.CategoryRepository;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.repository.ReplyRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class FinderService {

    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final PostsRepository postsRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    // 회원 조회
    public Optional<Member> findMemberById(Long memberId) {
        return memberRepository.findById(memberId);
    }

    // 회원 조회
    public Optional<Member> findMemberByName(String name) {
        return memberRepository.findByName(name);
    }

    // 카테고리 단일 조회 : id
    public Category findCategoryById(Long categoryId) {
        return findVerifyCategory(categoryId);
    }

    // 유효한 카테고리 조회
    public Category findVerifyCategory(Long categoryId) {
        Optional<Category> findCategory = categoryRepository.findById(categoryId);
        if (findCategory.isPresent()) {
            return findCategory.get();
        }
        throw new BusinessLogicException(BusinessExceptionCode.CATEGORY_NOT_FOUND);
    }

    // 유효한 회원 조회 : id 조회
    public Member findVerifiedMemberById(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        return findMember
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 유효한 회원 조회 : name 조회
    public Member findVerifiedMemberByName(String name) {
        Optional<Member> findMember = memberRepository.findByName(name);
        return findMember
                .orElseThrow( () -> new BusinessLogicException(BusinessExceptionCode.USER_NOT_FOUND));
    }

    // 게시글 조회
    public Optional<Posts> findPostsById(Long postsId) {
        return postsRepository.findById(postsId);
    }

    // 유효한 Posts 조회
    public Posts findVerifyPostsById(Long postsId) {
        Optional<Posts> findPosts = postsRepository.findById(postsId);
        if (findPosts.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.POSTS_NOT_FOUND);
        }
        return findPosts.get();
    }

    // 댓글 조회
    public Optional<Comment> findCommentById(Long commentId) {
        return commentRepository.findById(commentId);
    }

    // 유효한 Comment 조회
    public Comment findVerifyCommentById(Long commentId) {
        Optional<Comment> findComment = commentRepository.findById(commentId);
        if (findComment.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.COMMENT_NOT_FOUND);
        }
        return findComment.get();
    }

    // 답글 조회
    public Optional<Reply> findReplyById(Long replyId) {
        return replyRepository.findById(replyId);
    }

    // 유효한 Reply 조회
    public Reply findVerifyReplyById(Long replyId) {
        Optional<Reply> findReply = replyRepository.findById(replyId);
        if (findReply.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.REPLY_NOT_FOUND);
        }
        return findReply.get();
    }
}
