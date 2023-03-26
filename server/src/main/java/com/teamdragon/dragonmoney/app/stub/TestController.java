package com.teamdragon.dragonmoney.app.stub;

import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.dto.HappyHouseApiDto;
import com.teamdragon.dragonmoney.app.domain.information.information.house.happyhouse.service.HappyHouseService;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class TestController {

    private final StubService stubService;

    @PostMapping("/stub")
    public ResponseEntity<?> allMakeTest() {
        stubService.makeStubData();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/member")
    public ResponseEntity<?> memberMakeTest() {
        stubService.makeMembers();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/image")
    public ResponseEntity<?> imageMakeTest() {
        stubService.makeImages(null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/post")
    public ResponseEntity<?> postsMakeTest() {
        stubService.makePosts(null, null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/post/best")
    public ResponseEntity<?> bestAwardsMakeTest() {
        stubService.makeBestAwards(null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/comment")
    public ResponseEntity<?> commentMakeTest() {
        stubService.makeComments(null, null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/reply")
    public ResponseEntity<?> replyMakeTest() {
        stubService.makeReplies(null, null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/post/thumb")
    public ResponseEntity<?> postsThumbMakeTest() {
        stubService.makeThumbPosts(null, null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/comment/thumb")
    public ResponseEntity<?> commentThumbMakeTest() {
        stubService.makeThumbComments(null, null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/reply/thumb")
    public ResponseEntity<?> replyThumbMakeTest() {
        stubService.makeThumbReplies(null, null);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/api/price")
    public ResponseEntity<?> priceMakeTest() {
        stubService.makeHousePriceData();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/stub/api/happy")
    public ResponseEntity<?> happyMakeTest() {
        stubService.makeHappyHouseData();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}