package com.teamdragon.dragonmoney.app.domain.posts.controller;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import com.teamdragon.dragonmoney.app.domain.image.mapper.ImageMapper;
import com.teamdragon.dragonmoney.app.domain.image.repository.ImageRepository;
import com.teamdragon.dragonmoney.app.domain.image.service.ImageService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.repository.MemberRepository;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.domain.posts.dto.PostsDto;
import com.teamdragon.dragonmoney.app.domain.posts.entity.Posts;
import com.teamdragon.dragonmoney.app.domain.posts.entity.PostsTag;
import com.teamdragon.dragonmoney.app.domain.posts.mapper.PostsMapper;
import com.teamdragon.dragonmoney.app.domain.posts.repository.PostsRepository;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsService;
import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import com.teamdragon.dragonmoney.app.domain.tag.repository.TagRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumbup;
import com.teamdragon.dragonmoney.app.domain.thumb.respository.ThumbupRepository;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Validated
@RequestMapping("/posts")
@RestController
public class PostsController {

    private final PostsService postsService;
    private final PostsMapper postsMapper;
    private final ImageService imageService;
    private final ImageMapper imageMapper;
    private final MemberService memberService;

    // 추가
    @PostMapping
    public ResponseEntity<Map<String, Long>> postPosts(@AuthenticationPrincipal Principal principal,
                                                       @Valid @RequestBody PostsDto.Post postsDto) {
        Member loginMember = memberService.findMember(principal.getName());
        // 이미지 처리
        PostsDto.PostImagesDto saveImages = postsDto.getSaveImages();
        List<Image> removedImages
                = imageMapper.imageDtoListToImageList(saveImages.getRemovedImages());
        imageService.removeImages(loginMember, removedImages);
        // Posts 처리
        Posts posts = postsMapper.postDtoToPosts(postsDto);
        Posts savePosts = postsService.savePosts(loginMember, posts);
        Map<String, Long> response = new HashMap<>();
        // 주의 : postId <<< postsId 가 아님
        response.put("postId", savePosts.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 삭제 :   주의 : RequestParam post-id <<< posts-id 가 아님
    @DeleteMapping("/{post-id}")
    public ResponseEntity<Void> deletePosts(@AuthenticationPrincipal Principal principal,
                                            @Valid @Positive @RequestParam("post-id") Long postsId) {
        Member loginMember = memberService.findMember(principal.getName());
        postsService.removePosts(loginMember, postsId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity<Map<String, Long>> patchPosts(@AuthenticationPrincipal Principal principal,
                                                        @Valid @RequestBody PostsDto.Patch patchDto,
                                                        @Valid @Positive @RequestParam("post-id") Long postsId) {
        Member loginMember = memberService.findMember(principal.getName());
        // 이미지 처리
        PostsDto.PatchImagesDto saveImages = patchDto.getSaveImages();
        List<Image> removedImages
                = imageMapper.imageDtoListToImageList(saveImages.getRemovedImages());
        imageService.removeImages(loginMember, removedImages);
        // Posts 처리
        Posts posts = postsMapper.patchDtoToPosts(patchDto);
        Posts updatePosts = postsService.updatePosts(loginMember, postsId, posts);
        Map<String, Long> response = new HashMap<>();
        // 주의 : postId <<< postsId 가 아님
        response.put("postId", updatePosts.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 상세 조회
    @GetMapping("/post-id")
    public ResponseEntity<PostsDto.PostsDetail> getPostsDetail(@AuthenticationPrincipal Principal principal,
                                                               @Valid @Positive @RequestParam("post-id") Long postsId) {
        Long loginMemberId = null;
        if (principal != null) {
            Member loginMember = memberService.findMember(principal.getName());
            loginMemberId = loginMember.getId();
        }
        PostsDto.PostsDetail postsDetail = postsService.findPostsDetail(postsId, loginMemberId);
        return new ResponseEntity<>(postsDetail, HttpStatus.OK);
    }

    // 목록 조회
    @GetMapping
    public ResponseEntity<PostsDto.PostsList> getPostsList(@Valid @Positive @RequestParam int page,
                                                           @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        Page<Posts> postsList = postsService.findPostsList(page, orderBy);
        PostsDto.PostsList response = new PostsDto.PostsList(postsList, orderBy.getOrderBy());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 검색
    @GetMapping("/search")
    public ResponseEntity<PostsDto.PostsList> getSearchPostsList(@RequestParam String keyword,
                                                                 @RequestParam String[] tags,
                                                                 @Valid @Positive @RequestParam int page,
                                                                 @RequestParam String orderby) {
        Posts.OrderBy orderBy = checkOrderBy(orderby);
        Page<Posts> postsList = postsService.findPostsListByTagsAndTitle(keyword, tags, page, orderBy);
        PostsDto.PostsList response = new PostsDto.PostsList(postsList, orderBy.getOrderBy());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // orderby 유효성검사 및 변환
    private Posts.OrderBy checkOrderBy(String orderby) {
        for (Posts.OrderBy postsOrderby : Posts.OrderBy.values()) {
            if (postsOrderby.getOrderBy().equals(orderby)) {
                return postsOrderby;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.ORDER_BY_NOT_VALID);
    }







    private final PostsRepository postsRepository;
    private final ImageRepository imageRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final ThumbupRepository thumbupRepository;
    private final EntityManager em;


    // 테스트용
    @GetMapping("/test")
    public ResponseEntity<?> testReq() {
        test();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    void test() {
        // given
        // 회원 생성
        Member saveMember = memberRepository.save(Member.builder()
                .name("member1")
                .profileImage("imageUrl")
                .email("email@email.com")
                .build());
        // 이미지 생성
        List<List<Image>> imageGroup = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            ArrayList<Image> images = new ArrayList<>();
            for (int j = 0; j < 5; j++) {
                images.add(
                        Image.builder()
                                .url("imageUrl" + j)
                                .uploader(saveMember)
                                .state(Image.State.POSTED)
                                .extension("imageExt")
                                .fileName("imageFileName" + j)
                                .build()
                );
            }
            List<Image> saveImages = imageRepository.saveAll(images);
            imageGroup.add(saveImages);
        }

        // 태그 생성
        ArrayList<Tag> tags = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            tags.add(Tag.builder().name("태그" + i).build());
        }
        List<Tag> saveTags = tagRepository.saveAll(tags);

        for (int i = 0; i < 20; i++) {
            List<Image> saveImages = imageGroup.get(i);
            List<Long> imageIds = saveImages.stream().map(image -> image.getId()).collect(Collectors.toList());
            List<Image> imagesByIds = imageRepository.findAllByIds(imageIds);

            Posts posts = Posts.builder()
                    .writer(saveMember)
                    .title("postTitle" + i)
                    .content("postContent" + i)
                    .images(imagesByIds)
                    .build();

            for (int j = 0; j < (i%5); j++) {
                posts.addPostsTag(new PostsTag(posts, saveTags.get(j)));
            }

            Posts savePosts = postsRepository.save(posts);

            Thumbup thumbup = Thumbup.builder()
                    .parentPosts(savePosts)
                    .member(saveMember)
                    .build();
            thumbupRepository.save(thumbup);
        }

        // when
        Optional<Posts> posts1 = postsRepository.findById(1L); // 5
        Posts posts11 = posts1.get();
        System.out.println("posts image = " + posts11.getImages().size()); // 5
        List<Image> images = posts11.getImages();
        List<Image> all = imageRepository.findAll();
        imageRepository.deleteById(all.get(5).getId());
        imageRepository.deleteById(all.get(6).getId());
        imageRepository.deleteById(all.get(7).getId());
        imageRepository.deleteById(all.get(8).getId());
        imageRepository.deleteById(1L); // -1
        imageRepository.deleteById(2L); // -1
        imageRepository.deleteById(3L); // -1
        imageRepository.deleteById(4L); // -1
        System.out.println("posts image = " + posts11.getImages().size()); // 5(4)
        Image image1 = Image.builder()
                .url("newImage")
                .uploader(saveMember)
                .state(Image.State.POSTED)
                .extension("imageExt")
                .fileName("imageFileName")
                .build();
        imageRepository.save(image1);
        posts11.addImage(image1);
        System.out.println("image1 = " + image1);
        Image image2 = Image.builder()
                .url("newImage")
                .uploader(saveMember)
                .state(Image.State.POSTED)
                .extension("imageExt")
                .fileName("imageFileName")
                .build();
        imageRepository.save(image2);
        posts11.addImage(image2);
        System.out.println("image2 = " + image1);
        Posts save = postsRepository.save(posts11);
        List<Image> images1 = save.getImages();
        for (Image image : images1) {
            System.out.println("image = " + image);
        }
        System.out.println("posts image = " + save.getImages().size()); // 7(6)
        em.clear();
        Optional<Posts> posts2 = postsRepository.findById(1L); // 5
        Posts posts22 = posts2.get();
        System.out.println("posts image = " + posts22.getImages().size());// (6)


//        Pageable pageable = PageRequest.of(3, 10, Sort.by("createdAt").descending());
//        Page<Posts> searchResult = postsRepository.findPostsListBySearch("postTitle", new String[]{"태그1", "태그2"}, pageable);
//        System.out.println("searchResult.getSize() = " + searchResult.getSize());
//        PostsDto.PostsList createdAt = new PostsDto.PostsList(searchResult, "createdAt");

//        Pageable pageable = PageRequest.of(2, 10, Sort.by("createdAt").descending());
//        Page<Posts> member1 = postsRepository.findPostsListByMemberName("member1", pageable);
//        PostsDto.PostsList createdAt = new PostsDto.PostsList(member1, "createdAt");

//        Page<Posts> postsListPage = postsRepository.findPostsListByPage(pageable);
//        List<Posts> postsList = postsListPage.getContent();
//        System.out.println("postsList.size() = " + postsList.size());

//        PostsDto.PostsDetail postsDetail = postsRepository.findPostsDetail(savePosts.getId());
//        PostsDto.PostsDetail postsDetailByMemberId = postsRepository.findPostsDetailByMemberId(savePosts.getId(), saveMember.getId());
        // then
//        for (Image imagesById : imagesByIds) {
//            System.out.println("imagesById = " + imagesById);
//        }
//
//         System.out.println("postsDetail = " + postsDetail);
//        System.out.println("postsDetail = " + postsDetailByMemberId);

//        for (PostsDto.PostsListElement postsListElement : postsList) {
//            System.out.println("postsListElement = " + postsListElement);
//        }

        // System.out.println("postsDetailByMemberId = " + postsDetailByMemberId);

        // Assertions.assertThat(tagRepository.findAll().size()).isEqualTo(0);
    }

}
