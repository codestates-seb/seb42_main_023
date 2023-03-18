package com.teamdragon.dragonmoney.app.domain.reply.repository;

public interface ReplyRepositoryCustom {
    Long updateThumbupCountPlus(Long replyId);
    Long updateThumbupCountMinus(Long replyId);
    Long updateThumbdownCountPlus(Long replyId);
    Long updateThumbdownCountMinus(Long replyId);
}
