package com.teamdragon.dragonmoney.app.domain.posts.service;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentService;
import com.teamdragon.dragonmoney.app.domain.common.service.FinderService;
import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.service.ImageService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsTagRepository;
import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import com.teamdragon.dragonmoney.app.domain.tag.service.TagService;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class PostsService implements ThumbCountService {

    private final PostsRepository postsRepository;
    private final PostsTagRepository postsTagRepository;
    private final FinderService finderService;
    private final CommentService commentService;
    private final TagService tagService;
    private final ImageService imageService;

    private final int PAGE_ELEMENT_SIZE = 10;
    // 현재 운영에 사용되는 카테고리는 1개 이다.
    private final Long CURRENT_CATEGORY_ID = 1L;

    // 게시글 생성
    public Posts savePosts(Member loginMember, Posts newPosts, List<Image> removedImages){
        // 카테고리 조회
        Category findCategory = finderService.findCategoryById(CURRENT_CATEGORY_ID);
        // 이미지 삭제
        imageService.removeImages(loginMember, removedImages);

        // 업로드 이미지 조회
        List<Image> findImages = new ArrayList<>();
        List<Image> newPostsImages = newPosts.getImages();
        if (newPostsImages != null && !newPostsImages.isEmpty()) {
            findImages = imageService.findImages(newPostsImages);
        }
        // 태그 조회 및 저장
        List<PostsTag> newPostsPostsTags = newPosts.getPostsTags();
        List<PostsTag> postsTags = new ArrayList<>();
        if (newPostsPostsTags != null && !newPostsPostsTags.isEmpty()) {
            List<String> tagNames = newPostsPostsTags.stream()
                    .map(postsTag -> postsTag.getTag().getName())
                    .collect(Collectors.toList());
            postsTags = getPostsTags(tagNames);
        }

        Posts posts = Posts.builder()
                .writer(loginMember)
                .category(findCategory)
                .images(findImages)
                .postsTags(postsTags)
                .title(newPosts.getTitle())
                .content(newPosts.getContent())
                .build();
        return postsRepository.save(posts);
    }

    // 게시글 삭제
    public Long removePosts(Member loginMember, Long postsId){
        Posts findPosts = checkOwner(loginMember, postsId);
        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.SELF_DELETED)
                .build();
        findPosts.changeStateToDeleted(deleteResult);

        // 태그 삭제
        postsTagRepository.deleteByPosts_Id(findPosts.getId());
        tagService.removeOrphanTag();
        // 이미지 삭제
        imageService.removeImages(loginMember, findPosts.getImages());
        // 댓글 삭제 처리
        commentService.removeCommentsByParent(findPosts.getComments());

        postsRepository.save(findPosts);
        return postsId;
    }

    // 신고에 의한 게시글 삭제
    public void removeRepostedPosts(Member member, Posts posts) {
        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.DELETED_BY_REPORT)
                .build();
        posts.changeStateToDeleted(deleteResult);

        // 태그 삭제
        postsTagRepository.deleteByPosts_Id(posts.getId());
        tagService.removeOrphanTag();
        // 이미지 삭제
        imageService.removeImages(member, posts.getImages());
        // 댓글 삭제 처리
        commentService.removeCommentsByParent(posts.getComments());

        postsRepository.save(posts);
    }

    // 게시글 수정
    public Posts updatePosts(Member loginMember, Long postsId, Posts updatePosts, List<Image> removedImages){
        Posts originalPosts = checkOwner(loginMember, postsId);
        originalPosts.isModifiedNow();

        // 이미지 처리
        imageService.removeImages(loginMember, removedImages);
        // 태그 처리
        List<PostsTag> newPostsTags = updateTags(updatePosts, originalPosts);
        for (PostsTag newPostsTag : newPostsTags) {
            originalPosts.addPostsTag(newPostsTag);
        }
        // 추가된 이미지 : 이미지 추가
        List<Image> newImages = imageService.findImages(updatePosts.getImages());
        if (newImages != null && !newImages.isEmpty()) {
            for (Image newImage : newImages) {
                originalPosts.addImage(newImage);
            }
        }

        originalPosts.updateTitle(updatePosts.getTitle());
        originalPosts.updateContent(updatePosts.getContent());
        return postsRepository.save(originalPosts);
    }

    // Posts 엔티티 조회
    public Posts findOne(Long postsId){
        return findVerifyPostsById(postsId);
    }

    // 게시글 상세 조회 : 게시글 id
    public PostsDto.PostsDetailRes findPostsDetail(Long postsId, Long loginMemberId){
        plusViewCount(postsId);
        if (loginMemberId == null) {
            return postsRepository.findPostsDetailById(postsId);
        } else {
            return postsRepository.findPostsDetailByMemberId(postsId, loginMemberId);
        }
    }

    // 게시글 북마크 수 빼기
    public void minusBookmarkCount(Posts posts) {
        posts.minusBookmarkCount();
        postsRepository.save(posts);
    }

    // 게시글 목록 조회 : 요청페이지번호, 정렬기준
    public Page<Posts> findPostsList(int page, Posts.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        return postsRepository.findPostsListByPage(pageable);
    }

    // 게시글 목록 조회 : 검색기능 : 태그목록 + 제목
    public Page<Posts> findPostsListByTagsAndTitle(String keyword, String[] tagNames, int page, Posts.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        if (tagNames == null || tagNames.length == 0) {
            return postsRepository.findPostsListBySearchWithoutTagNames(keyword, pageable);
        } else {
            return postsRepository.findPostsListBySearch(keyword, tagNames, pageable);
        }
    }

    // 게시글 목록 조회 : 작성자 닉네임
    public Page<Posts> findPostsListByWriterPost(String memberName, int page, Posts.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        return postsRepository.findPostsListByMemberName(memberName, pageable);
    }

    // 게시물 목록 조회 : 회원이 좋아요 한 글 (마이 페이지)
    public Page<Posts> findPostsListByThumbUpPost(String memberName, int page, Posts.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        return postsRepository.findThumbUpPostsListByMemberName(memberName, pageable);
    }

    // 게시물 목록 조회 : 회원이 북마크 한 글 (마이 페이지)
    public Page<Posts> findPostsListByBookmarkPost(String memberName, int page, Posts.OrderBy orderBy){
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        return postsRepository.findBookmarkPostsListByMemberName(memberName, pageable);
    }

    @Override
    public ThumbDto thumbupStateUpdate(Long postsId, boolean needInquiry, ThumbDto.ACTION action) {
        Posts findPosts = findVerifyPostsById(postsId);
        if (action == ThumbDto.ACTION.PLUS) {
            findPosts.plusThumbupCount();
        } else if ( action == ThumbDto.ACTION.MINUS) {
            findPosts.minusThumbupCount();
        }
        Posts updatePosts = postsRepository.save(findPosts);
        if (needInquiry) {
            return updatePosts.getThumbCount();
        }
        return null;
    }

    @Override
    public ThumbDto thumbdownStateUpdate(Long postsId, boolean needInquiry, ThumbDto.ACTION action) {
        Posts findPosts = findVerifyPostsById(postsId);
        if (action == ThumbDto.ACTION.PLUS) {
            findPosts.plusThumbdownCount();
        } else if ( action == ThumbDto.ACTION.MINUS) {
            findPosts.minusThumbdownCount();
        }
        Posts updatePosts = postsRepository.save(findPosts);
        if (needInquiry) {
            return updatePosts.getThumbCount();
        }
        return null;
    }

    // PostsTag 획득
    private List<PostsTag> getPostsTags(List<String> tagNames) {
        List<Tag> tags = saveTags(tagNames);
        // PostsTag 설정
        List<PostsTag> postsTags = new ArrayList<>();
        for (Tag tag : tags) {
            postsTags.add(new PostsTag(null, tag));
        }
        return postsTags;
    }

    // update 로 인한 태그 삭제 및 추가 처리
    private List<PostsTag> updateTags(Posts updatePosts, Posts originalPosts) {
        List<String> updateTagNames = updatePosts.getTagNames();
        List<String> originalTagNames = originalPosts.getTagNames();

        List<String> newTagNames = new ArrayList<>();
        List<String> removedTagNames = new ArrayList<>();

        for (String updateTagName : updateTagNames) {
            if (!originalTagNames.contains(updateTagName)) {
                newTagNames.add(updateTagName);
            }
        }
        for (String originalTagName : originalTagNames) {
            if (!updateTagNames.contains(originalTagName)) {
                removedTagNames.add(originalTagName);
            }
        }
        postsTagRepository.deleteAllByPostsIdAndTagName(originalPosts.getId(), removedTagNames);
        return getPostsTags(newTagNames);
    }

    // 조회수 증가
    private void plusViewCount(Long postsId) {
        Posts findPosts = findVerifyPostsById(postsId);
        findPosts.plusViewCount();
        postsRepository.save(findPosts);
    }

    // 작성자 확인
    private Posts checkOwner(Member loginMember, Long postsId) {
        Posts findPosts = findVerifyPostsById(postsId);
        if (!findPosts.getWriter().getId().equals(loginMember.getId())) {
            throw new AuthLogicException(AuthExceptionCode.AUTHORIZED_FAIL);
        }
        return findPosts;
    }

    // Tags 조회 및 저장
    private List<Tag> saveTags(List<String> tagNames) {
        return tagService.saveListTag(tagNames);
    }

    // 유효한 Posts 조회
    private Posts findVerifyPostsById(Long postsId) {
        Optional<Posts> findPosts = postsRepository.findById(postsId);
        if (findPosts.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.POSTS_NOT_FOUND);
        }
        return findPosts.get();
    }
}