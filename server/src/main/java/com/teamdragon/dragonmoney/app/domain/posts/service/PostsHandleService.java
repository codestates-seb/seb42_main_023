package com.teamdragon.dragonmoney.app.domain.posts.service;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;

import java.util.List;

public interface PostsHandleService {

    Posts savePosts(Member loginMember, Posts newPosts, List<Image> removedImages);

    void minusBookmarkCount(Posts posts);

    // 게시글 삭제
    Long removePosts(Member loginMember, Long postsId);

    // 신고에 의한 게시글 삭제
    void removeRepostedPosts(Member member, Posts posts);

    // 회원 탈퇴로 인한 삭제
    void removePostsByDeletedMember(String memberName);

    // 게시글 수정
    Posts updatePosts(Member loginMember, Long postsId, Posts updatePosts, List<Image> removedImages);

    // PostsTag 획득
    List<PostsTag> getPostsTagList(List<String> tagNames);

    // update 로 인한 태그 삭제 및 추가 처리
    List<PostsTag> updateTagList(Posts updatePosts, Posts originalPosts);

    // 작성자 확인
    Posts checkOwner(Member loginMember, Long postsId);

    // Tags 조회 및 저장
    List<Tag> saveTagList(List<String> tagNames);
}
