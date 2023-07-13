package com.teamdragon.dragonmoney.app.global.countsync.service;

import com.teamdragon.dragonmoney.app.domain.comment.service.CommentHandleService;
import com.teamdragon.dragonmoney.app.domain.posts.service.PostsHandleService;
import com.teamdragon.dragonmoney.app.domain.reply.service.ReplyHandleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class CountSyncScheduled {

    private final PostsHandleService postsHandleService;
    private final CommentHandleService commentHandleService;
    private final ReplyHandleService replyHandleService;

    // 게시글, 댓글, 답글 count 데이터 동기화
    @Scheduled(cron = "0 0 3 * * MON")
    public void syncCount() {
        postsHandleService.updateCounts();
        sleep();
        commentHandleService.updateCounts();
        sleep();
        replyHandleService.updateCounts();
    }

    private void sleep() {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            log.error("게시글, 댓글, 답글 count 동기화과정 에러 발생", e);
        }
    }
}
