package com.teamdragon.dragonmoney.app.domain.reply.service;

import com.teamdragon.dragonmoney.app.domain.reply.dto.ReplyDto;
import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.repository.ReplyRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReplyFindServiceImpl implements ReplyFindService {

    private final ReplyRepository replyRepository;
    private static final int PAGE_ELEMENT_SIZE = 10;

    // 단일 조회 : Active 상태
    @Override
    public Reply findOneStateActive(Long postsId) {
        Reply findReply = findVerifyReplyById(postsId);
        if (findReply.getState() != Reply.State.ACTIVE) {
            throw new BusinessLogicException(BusinessExceptionCode.THUMB_UNUSABLE);
        }
        return findReply;
    }

    // 목록 조회
    @Override
    public Page<ReplyDto.ReplyListElement> findReplyList(int page, Long commentId, Reply.OrderBy orderBy, Long loginMemberId) {
        Pageable pageable = PageRequest.of(page - 1 , PAGE_ELEMENT_SIZE, Sort.by(orderBy.getTargetProperty()).descending());
        if (loginMemberId == null ) {
            return replyRepository.findReplyListByPage(pageable, commentId);
        } else {
            return replyRepository.findReplyListByPageAndMemberId(pageable, commentId, loginMemberId);
        }
    }

    // 유효한 Reply 조회
    @Override
    public Reply findVerifyReplyById(Long replyId) {
        Optional<Reply> findReply = replyRepository.findById(replyId);
        if (findReply.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.REPLY_NOT_FOUND);
        }
        return findReply.get();
    }

}
