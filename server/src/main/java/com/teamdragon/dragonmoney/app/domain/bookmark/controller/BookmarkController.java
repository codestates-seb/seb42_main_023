package com.teamdragon.dragonmoney.app.domain.bookmark.controller;

import com.teamdragon.dragonmoney.app.domain.bookmark.dto.BookmarkDto;
import com.teamdragon.dragonmoney.app.domain.bookmark.service.BookmarkHandleService;
import com.teamdragon.dragonmoney.app.domain.common.service.FinderService;
import com.teamdragon.dragonmoney.app.domain.member.entity.Member;
import com.teamdragon.dragonmoney.app.domain.member.service.MemberHandleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;

@RequiredArgsConstructor
@Validated
@RestController
public class BookmarkController {
    private final BookmarkHandleService bookmarkHandleService;
    private final FinderService finderService;
    private final MemberHandleServiceImpl memberService;

    // 북마크 추가
    @PostMapping("/members/{member-name}/bookmark/posts/{post-id}")
    public ResponseEntity<BookmarkDto> createBookmark(@PathVariable("member-name") String memberName,
                                                      @Valid @Positive @PathVariable("post-id") Long postsId,
                                                      @AuthenticationPrincipal Principal principal) {

        memberService.bookmarkMemberCompareLoginMember(principal.getName(), memberName);
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        bookmarkHandleService.duplicateCheckBookmark(loginMember, postsId);

        BookmarkDto response = new BookmarkDto(true);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 북마크 삭제
    @DeleteMapping("/members/{member-name}/bookmark/posts/{post-id}")
    public ResponseEntity<BookmarkDto> removeBookmark(@PathVariable("member-name") String memberName,
                                                      @Valid @Positive @PathVariable("post-id") Long postsId,
                                                      @AuthenticationPrincipal Principal principal) {

        memberService.bookmarkMemberCompareLoginMember(principal.getName(), memberName);
        Member loginMember = finderService.findVerifiedMemberByName(principal.getName());
        bookmarkHandleService.removeBookmark(loginMember, postsId);

        BookmarkDto response = new BookmarkDto(false);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
