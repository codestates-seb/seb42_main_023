package com.teamdragon.dragonmoney.app.domain.bookmark.controller;

import com.teamdragon.dragonmoney.app.domain.bookmark.dto.BookmarkDto;
import com.teamdragon.dragonmoney.app.domain.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class BookmarkController {
    private final BookmarkService bookmarkService;

    // 북마크 추가
    @PostMapping("/members/{member-name}/bookmark/posts/{post-id}")
    public ResponseEntity postBookmark(@PathVariable("member-name") String memberName,
                                       @PathVariable("post-id") Long postsId) {
        bookmarkService.createBookmark(memberName,postsId);

        BookmarkDto response = new BookmarkDto();
        response.setIsBookmarked(true);


        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 북마크 삭제
    @DeleteMapping("/members/{member-name}/bookmark/posts/{post-id}")
    public ResponseEntity deleteBookmark (@PathVariable("member-name") String memberName,
                                          @PathVariable("post-id") Long postsId) {
        bookmarkService.removeBookmark(memberName, postsId);

        BookmarkDto response = new BookmarkDto();
        response.setIsBookmarked(false);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
