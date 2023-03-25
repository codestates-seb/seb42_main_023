package com.teamdragon.dragonmoney.app.domain.comment.controller;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.mapper.CommentMapper;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
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

    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final MemberService memberService;

    // 추가
    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity<CommentDto.CreateRes> createComment(@AuthenticationPrincipal Principal principal,
                                                         @Valid @Positive @PathVariable("post-id") Long postsId,
                                                         @Valid @RequestBody CommentDto.CreateReq commentDto) {
        Member loginMember = memberService.findMember(principal.getName());
        Comment newComment = commentMapper.createDtoToComment(commentDto);

        Comment saveComment = commentService.createComment(postsId, loginMember, newComment);
        CommentDto.CreateRes response = new CommentDto.CreateRes(saveComment.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 목록 조회
    @GetMapping("/posts/{post-id}/comments")
    public ResponseEntity<CommentDto.CommentListRes> findCommentList(@AuthenticationPrincipal Principal principal,
                                                                     @Valid @Positive @PathVariable("post-id") Long postsId,
                                                                     @Valid @Positive @RequestParam int page,
                                                                     @Valid @NotBlank @RequestParam String orderby) {
        Comment.OrderBy orderBy = checkOrderBy(orderby);
        Member loginMember = memberService.findMember(principal.getName());

        Page<CommentDto.CommentListElement> commentList = commentService.findCommentList(page, postsId, orderBy, loginMember.getId());
        CommentDto.CommentListRes response = new CommentDto.CommentListRes(commentList, orderby);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 삭제
    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity<Void> deleteComment(@AuthenticationPrincipal Principal principal,
                                              @Valid @Positive @PathVariable("comment-id") Long commentId) {
        Member loginMember = memberService.findMember(principal.getName());
        commentService.removeComment(loginMember, commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity<CommentDto.UpdateRes> updateComment(@AuthenticationPrincipal Principal principal,
                                                          @Valid @RequestBody CommentDto.UpdateReq commentDto,
                                                          @Valid @Positive @PathVariable("comment-id") Long commentId) {
        Member loginMember = memberService.findMember(principal.getName());
        Comment comment = commentMapper.updateDtoToComment(commentDto);
        Comment updateComment = commentService.updateComment(loginMember, commentId, comment);
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
