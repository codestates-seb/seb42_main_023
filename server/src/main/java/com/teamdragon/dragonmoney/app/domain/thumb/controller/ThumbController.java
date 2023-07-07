package com.teamdragon.dragonmoney.app.domain.thumb.controller;

import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.entity.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.service.ThumbHandleService;
import com.teamdragon.dragonmoney.app.domain.thumb.service.ThumbTargetType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RequiredArgsConstructor
@Validated
@RestController
public class ThumbController {

    private final ThumbHandleService thumbHandleService;

    // 좋아요 추가 : 게시글
    @PostMapping("/posts/{post-id}/thumbup")
    public ResponseEntity<ThumbDto> createThumbupToPosts(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("post-id") Long postsId) {
        ThumbDto response = thumbHandleService.saveThumb(ThumbTargetType.POSTS, principal.getName(), postsId, Thumb.Type.UP);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 좋아요 추가 : 댓글
    @PostMapping("/comments/{comment-id}/thumbup")
    public ResponseEntity<ThumbDto> createThumbupToComment(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("comment-id") Long commentId) {
        ThumbDto response = thumbHandleService.saveThumb(ThumbTargetType.COMMENT, principal.getName(), commentId, Thumb.Type.UP);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 좋아요 추가 : 답글
    @PostMapping("/replies/{reply-id}/thumbup")
    public ResponseEntity<ThumbDto> createThumbupToReply(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("reply-id") Long replyId) {
        ThumbDto response = thumbHandleService.saveThumb(ThumbTargetType.REPLY, principal.getName(), replyId, Thumb.Type.UP);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 좋아요 취소 : 게시글
    @DeleteMapping("/posts/{post-id}/thumbup")
    public ResponseEntity<ThumbDto> removeThumbupToPosts(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("post-id") Long postsId) {
        ThumbDto response = thumbHandleService.removeThumb(ThumbTargetType.POSTS, principal.getName(), postsId, Thumb.Type.UP);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 좋아요 취소 : 댓글
    @DeleteMapping("/comments/{comment-id}/thumbup")
    public ResponseEntity<ThumbDto> removeThumbupToComment(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("comment-id") Long commentId) {
        ThumbDto response = thumbHandleService.removeThumb(ThumbTargetType.COMMENT, principal.getName(), commentId, Thumb.Type.UP);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 좋아요 취소 : 답글
    @DeleteMapping("/replies/{reply-id}/thumbup")
    public ResponseEntity<ThumbDto> removeThumbupToReply(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("reply-id") Long replyId) {
        ThumbDto response = thumbHandleService.removeThumb(ThumbTargetType.REPLY, principal.getName(), replyId, Thumb.Type.UP);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 싫어요 추가 : 게시글
    @PostMapping("/posts/{post-id}/thumbdown")
    public ResponseEntity<ThumbDto> createThumbdownToPosts(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("post-id") Long postsId) {
        ThumbDto response = thumbHandleService.saveThumb(ThumbTargetType.POSTS, principal.getName(), postsId, Thumb.Type.DOWN);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 싫어요 추가 : 댓글
    @PostMapping("/comments/{comment-id}/thumbdown")
    public ResponseEntity<ThumbDto> createThumbdownToComment(@AuthenticationPrincipal Principal principal,
                                                             @PathVariable("comment-id") Long commentId) {
        ThumbDto response = thumbHandleService.saveThumb(ThumbTargetType.COMMENT, principal.getName(), commentId, Thumb.Type.DOWN);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 싫어요 추가 : 답글
    @PostMapping("/replies/{reply-id}/thumbdown")
    public ResponseEntity<ThumbDto> createThumbdownToReply(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("reply-id") Long replyId) {
        ThumbDto response = thumbHandleService.saveThumb(ThumbTargetType.REPLY, principal.getName(), replyId, Thumb.Type.DOWN);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 싫어요 취소 : 게시글
    @DeleteMapping("/posts/{post-id}/thumbdown")
    public ResponseEntity<ThumbDto> removeThumbdownToPosts(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("post-id") Long postsId) {
        ThumbDto response = thumbHandleService.removeThumb(ThumbTargetType.POSTS, principal.getName(), postsId, Thumb.Type.DOWN);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 싫어요 취소 : 댓글
    @DeleteMapping("/comments/{comment-id}/thumbdown")
    public ResponseEntity<ThumbDto> removeThumbdownToComment(@AuthenticationPrincipal Principal principal,
                                                             @PathVariable("comment-id") Long commentId) {
        ThumbDto response = thumbHandleService.removeThumb(ThumbTargetType.COMMENT, principal.getName(), commentId, Thumb.Type.DOWN);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 싫어요 취소 : 답글
    @DeleteMapping("/replies/{reply-id}/thumbdown")
    public ResponseEntity<ThumbDto> removeThumbdownToReply(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("reply-id") Long replyId) {
        ThumbDto response = thumbHandleService.removeThumb(ThumbTargetType.REPLY, principal.getName(), replyId, Thumb.Type.DOWN);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
