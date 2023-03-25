package com.teamdragon.dragonmoney.app.domain.reply.controller;

import com.teamdragon.dragonmoney.app.domain.comment.dto.CommentDto;
import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberService;
import com.teamdragon.dragonmoney.app.domain.reply.dto.ReplyDto;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.mapper.ReplyMapper;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyService;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailException;
import com.teamdragon.dragonmoney.app.global.exception.ValidFailExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.security.Principal;

@RequiredArgsConstructor
@RestController
public class ReplyController {

    private final MemberService memberService;
    private final ReplyService replyService;
    private final ReplyMapper replyMapper;

    // 추가
    @PostMapping("/comments/{comment-id}/replies")
    public ResponseEntity<ReplyDto.CreateRes> createReply(@AuthenticationPrincipal Principal principal,
                                                          @Valid @Positive @PathVariable("comment-id") Long commentId,
                                                          @Valid @RequestBody ReplyDto.CreateReq replyDto) {
        Member loginMember = memberService.findMember(principal.getName());
        Reply newReply = replyMapper.createDtoToReply(replyDto);

        Reply saveReply = replyService.createReply(commentId, loginMember, newReply);
        ReplyDto.CreateRes response = new ReplyDto.CreateRes(saveReply.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 목록 조회
    @GetMapping("/comments/{comment-id}/replies")
    public ResponseEntity<ReplyDto.ReplyListRes> findReplyList(@AuthenticationPrincipal Principal principal,
                                                                     @Valid @Positive @PathVariable("comment-id") Long commentId,
                                                                     @Valid @Positive @RequestParam int page,
                                                                     @Valid @NotBlank @RequestParam String orderby) {
        Reply.OrderBy orderBy = checkOrderBy(orderby);
        Member loginMember = memberService.findMember(principal.getName());

        Page<ReplyDto.ReplyListElement> replyList = replyService.findReplyList(page, commentId, orderBy, loginMember.getId());
        ReplyDto.ReplyListRes response = new ReplyDto.ReplyListRes(replyList, orderby);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 삭제
    @DeleteMapping("/replies/{reply-id}")
    public ResponseEntity<Void> deleteReply(@AuthenticationPrincipal Principal principal,
                                              @Valid @Positive @PathVariable("reply-id") Long replyId) {
        Member loginMember = memberService.findMember(principal.getName());
        replyService.removeReply(loginMember, replyId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/replies/{reply-id}")
    public ResponseEntity<ReplyDto.UpdateRes> updateReply(@AuthenticationPrincipal Principal principal,
                                                              @Valid @RequestBody ReplyDto.UpdateReq replyDto,
                                                              @Valid @Positive @PathVariable("reply-id") Long replyId) {
        Member loginMember = memberService.findMember(principal.getName());
        Reply reply = replyMapper.updateDtoToReply(replyDto);
        Reply updateReply = replyService.updateReply(loginMember, replyId, reply);
        ReplyDto.UpdateRes response = new ReplyDto.UpdateRes(updateReply.getId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // orderby 유효성검사 및 변환
    private Reply.OrderBy checkOrderBy(String orderby) {
        for (Reply.OrderBy postsOrderby : Reply.OrderBy.values()) {
            if (postsOrderby.getOrderBy().equals(orderby)) {
                return postsOrderby;
            }
        }
        throw new ValidFailException(ValidFailExceptionCode.ORDER_BY_NOT_VALID);
    }
}
