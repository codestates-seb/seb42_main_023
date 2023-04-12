package com.teamdragon.dragonmoney.app.domain.reply.service;

import com.teamdragon.dragonmoney.app.domain.comment.entity.Comment;
import com.teamdragon.dragonmoney.app.domain.comment.service.CommentFindService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.repository.ReplyRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbDto;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.domain.delete.entity.DeleteResult;
import com.teamdragon.dragonmoney.app.global.exception.AuthExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.AuthLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class ReplyHandleServiceImpl implements ReplyHandleService, ThumbCountService {

    private final ReplyFindService replyFindService;
    private final CommentFindService commentFindService;
    private final ReplyRepository replyRepository;

    // 추가
    @Override
    public Reply createReply(Long commentId, Member loginMember, Reply newReply) {
        Comment findComment = commentFindService.findVerifyCommentById(commentId);
        findComment.plusReplyCount();
        Reply reply = Reply.builder()
                .content(newReply.getContent())
                .writer(loginMember)
                .comment(findComment)
                .build();
        return replyRepository.save(reply);
    }

    // 삭제
    @Override
    public Long removeReply(Member loginMember, Long replyId) {
        Reply findReply = checkOwner(loginMember, replyId);
        DeleteResult deleteResult
                = DeleteResult.builder().deleteReason(DeleteResult.Reason.SELF_DELETED).build();
        findReply.changeStateToDeleted(deleteResult);
        replyRepository.save(findReply);
        return replyId;
    }

    // 여러 답글 삭제 : 부모 삭제로 인한 삭제
    @Override
    public void removeReplyListByParent(List<Reply> replies) {
        for (Reply reply : replies) {
            reply.changeStateToDeleted(new DeleteResult(DeleteResult.Reason.DELETED_BY_PARENT));
        }
        replyRepository.saveAll(replies);
    }

    // 신고에 의한 삭제
    @Override
    public void removeReplyByReport(Reply reply) {
        DeleteResult deleteResult
                = DeleteResult.builder().deleteReason(DeleteResult.Reason.DELETED_BY_REPORT).build();
        reply.changeStateToDeleted(deleteResult);
        replyRepository.save(reply);
    }

    // 회원 탈퇴로 인한 답글 삭제
    @Override
    public void removeReplyByDeletedMember(String memberName) {
        DeleteResult deleteResult = DeleteResult.builder()
                .deleteReason(DeleteResult.Reason.DELETED_BY_MEMBER_REMOVE)
                .build();

        List<Reply> replies = replyRepository.findReplyByDeletedMember(memberName);
        for(Reply addDeletedResultByReply : replies) {
            addDeletedResultByReply.changeStateToDeleted(deleteResult);
        }

        replyRepository.saveAll(replies);
    }

    // 수정
    @Override
    public Reply updateReply(Member loginMember, Long replyId, Reply updateReply) {
        Reply originalReply = checkOwner(loginMember, replyId);
        originalReply.isModifiedNow();
        originalReply.updateContent(updateReply.getContent());
        return replyRepository.save(originalReply);
    }

    @Override
    public ThumbDto modifyThumbupState(Long replyId, boolean needInquiry, ThumbDto.ACTION action) {
        Reply findReply = replyFindService.findVerifyReplyById(replyId);
        if (action == ThumbDto.ACTION.PLUS) {
            findReply.plusThumbupCount();
        } else if ( action == ThumbDto.ACTION.MINUS) {
            findReply.minusThumbupCount();
        }
        Reply updateReply = replyRepository.save(findReply);
        if (needInquiry) {
            return updateReply.getThumbCount();
        }
        return null;
    }

    @Override
    public ThumbDto modifyThumbdownState(Long replyId, boolean needInquiry, ThumbDto.ACTION action) {
        Reply findReply = replyFindService.findVerifyReplyById(replyId);
        if (action == ThumbDto.ACTION.PLUS) {
            findReply.plusThumbdownCount();
        } else if ( action == ThumbDto.ACTION.MINUS) {
            findReply.minusThumbdownCount();
        }
        Reply updateReply = replyRepository.save(findReply);
        if (needInquiry) {
            return updateReply.getThumbCount();
        }
        return null;
    }

    // 작성자 확인
    private Reply checkOwner(Member loginMember, Long replyId) {
        Reply findReply = replyFindService.findVerifyReplyById(replyId);
        if (!findReply.getWriter().getId().equals(loginMember.getId())) {
            throw new AuthLogicException(AuthExceptionCode.AUTHORIZED_FAIL);
        }
        return findReply;
    }
}
