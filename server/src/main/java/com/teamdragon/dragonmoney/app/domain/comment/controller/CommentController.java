package com.teamdragon.dragonmoney.app.domain.comment.controller;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.mapper.CommentMapper;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentFindService;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentHandleService;
import com.teamdragon.dragonmoney.app.domain.member.dto.MyPageDto;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberFindService;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.security.Principal;

@RequiredArgsConstructor
@Validated
@RestController
public class CommentController {

    private final CommentHandleService commentHandleService;
    private final CommentFindService commentFindService;
    private final CommentMapper commentMapper;
    private final MemberFindService memberFindService;

    // 추가
    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity<CommentDto.CreateRes> createComment(@AuthenticationPrincipal Principal principal,
                                                              @Valid @Positive @PathVariable("post-id") Long postsId,
                                                              @Valid @RequestBody CommentDto.CreateReq commentDto) {
        Member loginMember = memberFindService.findVerifiedMemberName(principal.getName());
        Comment newComment = commentMapper.createDtoToComment(commentDto);

        Comment saveComment = commentHandleService.createComment(postsId, loginMember, newComment);
        CommentDto.CreateRes response = new CommentDto.CreateRes(saveComment.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 목록 조회
    @GetMapping("/posts/{post-id}/comments")
    public ResponseEntity<CommentDto.CommentListRes> findCommentList(@AuthenticationPrincipal Principal principal,
                                                                     @Valid @Positive @PathVariable("post-id") Long postsId,
                                                                     @Valid @Positive @RequestParam int page,
                                                                     @Valid @NotBlank @RequestParam String orderby) {
        Long loginMemberId = null;
        if (principal != null) {
            Member loginMember = memberFindService.findVerifiedMemberName(principal.getName());
            loginMemberId = loginMember.getId();
        }

        Comment.OrderBy orderBy = checkOrderBy(orderby);

        Page<CommentDto.CommentListElement> commentList = commentFindService.findCommentList(page, postsId, orderBy, loginMemberId);
        CommentDto.CommentListRes response = new CommentDto.CommentListRes(commentList, orderby);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 특정 회원이 작성한 댓글 목록 (마이 페이지)
    @GetMapping("/members/{member-name}/comments")
    public ResponseEntity<MyPageDto.MyPageMemberCommentListRes> findCommentListByMember(@PathVariable("member-name") String memberName,
                                                                                        @Valid @Positive @RequestParam int page) {
        memberFindService.findVerifiedMemberName(memberName);
        MyPageDto.MyPageMemberCommentListRes response = commentFindService.findCommentListByMember(page, memberName);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 특정 회원이 좋아요를 누른 댓글 목록 (마이 페이지)
    @GetMapping("/members/{member-name}/thumbup/comments")
    public ResponseEntity<MyPageDto.MyPageMemberCommentListRes> findThumbUpCommentListByMember(@PathVariable("member-name") String memberName,
                                                                                               @Valid @Positive @RequestParam int page) {
        memberFindService.findVerifiedMemberName(memberName);
        MyPageDto.MyPageMemberCommentListRes response = commentFindService.findThumbUpCommentListByMember(page, memberName);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 삭제
    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity<Void> removeComment(@AuthenticationPrincipal Principal principal,
                                              @Valid @Positive @PathVariable("comment-id") Long commentId) {
        Member loginMember = memberFindService.findVerifiedMemberName(principal.getName());
        commentHandleService.removeComment(loginMember, commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity<CommentDto.UpdateRes> modifyComment(@AuthenticationPrincipal Principal principal,
                                                              @Valid @RequestBody CommentDto.UpdateReq commentDto,
                                                              @Valid @Positive @PathVariable("comment-id") Long commentId) {
        Member loginMember = memberFindService.findVerifiedMemberName(principal.getName());
        Comment comment = commentMapper.updateDtoToComment(commentDto);
        Comment updateComment = commentHandleService.modifyComment(loginMember, commentId, comment);
        CommentDto.UpdateRes response = new CommentDto.UpdateRes(updateComment.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // orderby 유효성검사 및 변환
    private Comment.OrderBy checkOrderBy(String orderby) {
        for (Comment.OrderBy postsOrderby : Comment.OrderBy.values()) {
            if (postsOrderby.getOrderBy().equals(orderby)) {
                return postsOrderby;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.ORDER_BY_NOT_VALID);
    }
}
