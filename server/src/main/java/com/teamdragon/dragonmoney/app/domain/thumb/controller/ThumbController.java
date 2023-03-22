package com.teamdragon.dragonmoney.app.domain.thumb.controller;

import com.teamdragon.dragonmoney.app.domain.common.service.FinderService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.service.ThumbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
public class ThumbController {

    private final FinderService finderService;
    private final ThumbService thumbService;

    // 좋아요 추가 : 게시글
    @PostMapping("/posts/{post-id}/thumbup")
    public ResponseEntity<ThumbDto> createThumbupToPosts(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("post-id") Long postsId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.saveThumbup(ThumbDto.Target.POSTS, loginMember, postsId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 좋아요 추가 : 댓글
    @PostMapping("/comments/{comment-id}/thumbup")
    public ResponseEntity<ThumbDto> createThumbupToComment(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("comment-id") Long commentId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.saveThumbup(ThumbDto.Target.COMMENT, loginMember, commentId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 좋아요 추가 : 답글
    @PostMapping("/replies/{reply-id}/thumbup")
    public ResponseEntity<ThumbDto> createThumbupToReply(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("reply-id") Long replyId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.saveThumbup(ThumbDto.Target.REPLY, loginMember, replyId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 좋아요 취소 : 게시글
    @DeleteMapping("/posts/{post-id}/thumbup")
    public ResponseEntity<ThumbDto> removeThumbupToPosts(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("post-id") Long postsId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.removeThumbup(ThumbDto.Target.POSTS, loginMember, postsId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 좋아요 취소 : 댓글
    @DeleteMapping("/comments/{comment-id}/thumbup")
    public ResponseEntity<ThumbDto> removeThumbupToComment(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("comment-id") Long commentId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.removeThumbup(ThumbDto.Target.COMMENT, loginMember, commentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 좋아요 취소 : 답글
    @DeleteMapping("/replies/{reply-id}/thumbup")
    public ResponseEntity<ThumbDto> removeThumbupToReply(@AuthenticationPrincipal Principal principal,
                                                         @PathVariable("reply-id") Long replyId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.removeThumbup(ThumbDto.Target.REPLY, loginMember, replyId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 싫어요 추가 : 게시글
    @PostMapping("/posts/{post-id}/thumbdown")
    public ResponseEntity<ThumbDto> createThumbdownToPosts(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("post-id") Long postsId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.saveThumbdown(ThumbDto.Target.POSTS, loginMember, postsId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 싫어요 추가 : 댓글
    @PostMapping("/comments/{comment-id}/thumbdown")
    public ResponseEntity<ThumbDto> createThumbdownToComment(@AuthenticationPrincipal Principal principal,
                                                             @PathVariable("comment-id") Long commentId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.saveThumbdown(ThumbDto.Target.COMMENT, loginMember, commentId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 싫어요 추가 : 답글
    @PostMapping("/replies/{reply-id}/thumbdown")
    public ResponseEntity<ThumbDto> createThumbdownToReply(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("reply-id") Long replyId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.saveThumbdown(ThumbDto.Target.REPLY, loginMember, replyId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 싫어요 취소 : 게시글
    @DeleteMapping("/posts/{post-id}/thumbdown")
    public ResponseEntity<ThumbDto> removeThumbdownToPosts(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("post-id") Long postsId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.removeThumbdown(ThumbDto.Target.POSTS, loginMember, postsId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 싫어요 취소 : 댓글
    @DeleteMapping("/comments/{comment-id}/thumbdown")
    public ResponseEntity<ThumbDto> removeThumbdownToComment(@AuthenticationPrincipal Principal principal,
                                                             @PathVariable("comment-id") Long commentId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.removeThumbdown(ThumbDto.Target.COMMENT, loginMember, commentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 싫어요 취소 : 답글
    @DeleteMapping("/replies/{reply-id}/thumbdown")
    public ResponseEntity<ThumbDto> removeThumbdownToReply(@AuthenticationPrincipal Principal principal,
                                                           @PathVariable("reply-id") Long replyId) {
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        ThumbDto response = thumbService.removeThumbdown(ThumbDto.Target.REPLY, loginMember, replyId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
