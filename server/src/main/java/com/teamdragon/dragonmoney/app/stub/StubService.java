package com.teamdragon.dragonmoney.app.stub;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.repository.CommentRepository;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.repository.ImageRepository;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.repository.ReplyRepository;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyService;
import com.teamdragon.dragonmoney.app.domain.tag.repository.TagRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbdown;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbup;
import com.teamdragon.dragonmoney.app.domain.thumb.respository.ThumbdownRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.respository.ThumbupRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Transactional
@Service
public class StubService {
    private final CommentRepository commentRepository;
    private final PostsRepository postsRepository;
    private final ImageRepository imageRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final ThumbupRepository thumbupRepository;
    private final ReplyRepository replyRepository;
    private final ReplyService replyService;
    private final ThumbdownRepository thumbdownRepository;

    private final String MEMBER_IMAGE_URL = "https://preview.free3d.com/img/2018/03/2269226802687772611/8mk0tyu6.jpg";
    private final String POSTS_IMAGE_URL = "https://cdn.dribbble.com/userupload/2585189/file/original-83a7c6bde4d8c033d208318966e913d7.png?compress=1&resize=752x";

    private final int MEMBER_NUMBER = 10;
    private final int POSTS_NUMBER = 110;
    private final int IMAGE_NUMBER_IN_POSTS = 3;
    private final int COMMENT_NUMBER_IN_POSTS = 20;
    private final int REPLY_NUMBER_IN_COMMENT = 20;

    public List<Member> makeMembers(){
        ArrayList<Member> members = new ArrayList<>();
        for (int i = 0; i < MEMBER_NUMBER; i++) {
            Member member = Member.builder()
                    .name("memberName" + 1)
                    .profileImage(MEMBER_IMAGE_URL)
                    .email("email" + i + "@email.com")
                    .build();
            members.add(member);
        }
        return memberRepository.saveAll(members);
    }

    public List<Image> makeImages(List<Member> saveMembers){
        ArrayList<Image> images = new ArrayList<>();
        for (int i = 0; i < POSTS_NUMBER * IMAGE_NUMBER_IN_POSTS; i++) {
            Image image = Image.builder()
                    .url(POSTS_IMAGE_URL)
                    .uploader(saveMembers.get(i % MEMBER_NUMBER))
                    .state(Image.State.POSTED)
                    .extension("jpeg")
                    .fileName("imageFileName" + i)
                    .build();
            images.add(image);
        }
        return imageRepository.saveAll(images);
    }

    public List<Posts> makePosts(List<Member> members, List<Image> saveImages) {
        Queue<Image> imageQueue = new LinkedList<>(saveImages);
        ArrayList<Posts> postsList = new ArrayList<>();
        for (int i = 0; i < POSTS_NUMBER; i++) {
            ArrayList<Image> postImages = new ArrayList<>();
            for (int j = 0; j < 3; j++) {
                Image image = imageQueue.poll();
                if (image != null) {
                    postImages.add(image);
                }
            }
            Posts posts = Posts.builder()
                    .writer(members.get(i % MEMBER_NUMBER))
                    .title(("postTitle " + i).repeat(2))
                    .content(("postContent " + i).repeat(30))
                    .images(postImages)
                    .build();
            postsList.add(posts);
        }
        return postsRepository.saveAll(postsList);
    }

    public List<Comment> makeComments(List<Member> members, List<Posts> savePosts) {
        ArrayList<Comment> comments = new ArrayList<>();
        for (Posts savePost : savePosts) {
            for (int i = 0; i < COMMENT_NUMBER_IN_POSTS; i++) {
                Comment comment = Comment.builder()
                        .posts(savePost)
                        .writer(members.get(i % MEMBER_NUMBER))
                        .content(("테스트 댓글 " + i + " ").repeat(2))
                        .build();
                comments.add(comment);
            }
        }
        return commentRepository.saveAll(comments);
    }

    public List<Reply> makeReplies(List<Member> saveMembers, List<Comment> saveComments) {
        ArrayList<Reply> replies = new ArrayList<>();
        for (Comment saveComment : saveComments) {
            for (int i = 0; i < REPLY_NUMBER_IN_COMMENT; i++) {
                Reply reply = Reply.builder()
                        .comment(saveComment)
                        .writer(saveMembers.get(i % MEMBER_NUMBER))
                        .content(("테스트 답글 " + i + " ").repeat(2))
                        .build();
                replies.add(reply);
            }
        }
        return replyRepository.saveAll(replies);
    }

    public void makeThumbPosts(List<Member> saveMembers, List<Posts> savePosts) {
        ArrayList<Thumbup> thumbups = new ArrayList<>();
        ArrayList<Thumbdown> thumbdowns = new ArrayList<>();
        for (int i = 0; i < savePosts.size(); i++) {
            Thumbup thumbup = Thumbup.builder()
                    .parentPosts(savePosts.get(i))
                    .member(saveMembers.get(i % MEMBER_NUMBER))
                    .build();
            Thumbdown thumbdown = Thumbdown.builder()
                    .parentPosts(savePosts.get(i))
                    .member(saveMembers.get(i % MEMBER_NUMBER))
                    .build();
            thumbups.add(thumbup);
            thumbdowns.add(thumbdown);
        }
        thumbupRepository.saveAll(thumbups);
        thumbdownRepository.saveAll(thumbdowns);
    }

    public void makeThumbComments(List<Member> saveMembers, List<Comment> saveComments) {
        ArrayList<Thumbup> thumbups = new ArrayList<>();
        ArrayList<Thumbdown> thumbdowns = new ArrayList<>();
        for (int i = 0; i < saveComments.size(); i++) {
            Thumbup thumbup = Thumbup.builder()
                    .parentComment(saveComments.get(i))
                    .member(saveMembers.get(i % MEMBER_NUMBER))
                    .build();
            Thumbdown thumbdown = Thumbdown.builder()
                    .parentComment(saveComments.get(i))
                    .member(saveMembers.get(i % MEMBER_NUMBER))
                    .build();
            thumbups.add(thumbup);
            thumbdowns.add(thumbdown);
        }
        thumbupRepository.saveAll(thumbups);
        thumbdownRepository.saveAll(thumbdowns);

    }

    public void makeThumbReplies(List<Member> saveMembers, List<Reply> replies) {
        ArrayList<Thumbup> thumbups = new ArrayList<>();
        ArrayList<Thumbdown> thumbdowns = new ArrayList<>();
        for (int i = 0; i < replies.size(); i++) {
            Thumbup thumbup = Thumbup.builder()
                    .parentReply(replies.get(i))
                    .member(saveMembers.get(i % MEMBER_NUMBER))
                    .build();
            Thumbdown thumbdown = Thumbdown.builder()
                    .parentReply(replies.get(i))
                    .member(saveMembers.get(i % MEMBER_NUMBER))
                    .build();
            thumbups.add(thumbup);
            thumbdowns.add(thumbdown);
        }
        thumbupRepository.saveAll(thumbups);
        thumbdownRepository.saveAll(thumbdowns);
    }

    public void makeStubData() {
        // 회원 : 5명
        List<Member> saveMembers = makeMembers();

        // 이미지 330 개 : 게시글 1개당 3개
        List<Image> saveImages = makeImages(saveMembers);

        // 게시글 110 개
        List<Posts> savePosts = makePosts(saveMembers, saveImages);

        // 댓글 2200 개 : 게시글 1개당 20개
        List<Comment> saveComments = makeComments(saveMembers, savePosts);

        // 대댓글 66000 개 : 댓글 1개당 30개
        List<Reply> saveReplies = makeReplies(saveMembers, saveComments);

        // 게시글, 댓글, 답글 각각 개당 좋아요 2개, 싫어요2개
        makeThumbPosts(saveMembers, savePosts);
        makeThumbComments(saveMembers, saveComments);
        makeThumbReplies(saveMembers, saveReplies);
    }
}
