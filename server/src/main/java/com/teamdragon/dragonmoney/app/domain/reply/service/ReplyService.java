package com.teamdragon.dragonmoney.app.domain.reply.service;

import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import com.teamdragon.dragonmoney.app.domain.reply.repository.ReplyRepository;
import com.teamdragon.dragonmoney.app.domain.thumb.Thumb;
import com.teamdragon.dragonmoney.app.domain.thumb.ThumbCountService;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReplyService implements ThumbCountService {

    private final ReplyRepository replyRepository;

    public Reply findOne(Long replyId) {
        return null;
    }

    @Override
    public Thumb thumbupPlusUpdate(Long replyId, boolean needInquiry) {
        replyRepository.updateThumbupCountPlus(replyId);
        return getThumbByNeedInquiry(needInquiry, replyId);
    }
    @Override
    public Thumb thumbupMinusUpdate(Long replyId, boolean needInquiry) {
        replyRepository.updateThumbupCountMinus(replyId);
        return getThumbByNeedInquiry(needInquiry, replyId);
    }

    @Override
    public Thumb thumbdownPlusUpdate(Long replyId, boolean needInquiry) {
        replyRepository.updateThumbdownCountPlus(replyId);
        return getThumbByNeedInquiry(needInquiry, replyId);
    }

    @Override
    public Thumb thumbdownMinusUpdate(Long replyId, boolean needInquiry) {
        replyRepository.updateThumbdownCountMinus(replyId);
        return getThumbByNeedInquiry(needInquiry, replyId);
    }

    // 조회 필요 여부에 따른 좋아요,싫어요 정보 반환
    private Thumb getThumbByNeedInquiry(boolean needInquiry, Long replyId) {
        if (needInquiry) {
            return findVerifyReplyById(replyId).getThumbCount();
        }
        return null;
    }

    // 유효한 Reply 조회
    private Reply findVerifyReplyById(Long replyId) {
        Optional<Reply> findReply = replyRepository.findById(replyId);
        if (findReply.isEmpty()) {
            throw new BusinessLogicException(BusinessExceptionCode.REPLY_NOT_FOUND);
        }
        return findReply.get();
    }
}
