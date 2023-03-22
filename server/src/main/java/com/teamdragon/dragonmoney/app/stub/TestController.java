package com.teamdragon.dragonmoney.app.stub;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TestController {

    private final StubService stubService;

    @GetMapping("/test")
    public ResponseEntity<?> testEndPoint() {
        stubService.makeStubData();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}