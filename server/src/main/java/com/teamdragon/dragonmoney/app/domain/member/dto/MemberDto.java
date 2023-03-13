package com.teamdragon.dragonmoney.app.domain.member.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.context.annotation.Primary;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


public class MemberDto {

    // oauth2 회원 등록을 대신할 임시 로직
    @Getter
    public static class PostTemp {
        @NotBlank
        @Pattern(regexp = "^[0-9A-Za-z가-힣]{2,8}$",
                message = "숫자, 영어, 한글이 포함된 2글자 이상 8글자 이하 이름만 사용 가능합니다.")
        private String name;
        @NotBlank
        private String email;
        @NotBlank
        private String profileImage;

        @Builder
        public PostTemp(String name, String email, String profileImage) {
            this.name = name;
            this.email = email;
            this.profileImage = profileImage;
        }
    }

    //회원가입(닉네임 중복 확인)
    @Getter
    public static class Post {
        @NotBlank
        @NotNull
        @Pattern(regexp = "^[0-9A-Za-z가-힣]{2,8}$",
                message = "숫자, 영어, 한글이 포함된 2글자 이상 8글자 이하 이름만 사용 가능합니다.")
        private String name;
    }

    //회원 수정
    @Getter
    public static class Patch {
        @NotNull(message = "내용을 입력해주세요.")
        @NotBlank(message = "공백은 불가능합니다.")
        @Size(max = 60, message = "60글자 이내로 작성 가능합니다.")
        private String intro;
    }

    @Setter
    @Getter
    public static class IntroResponse {
        private String intro;
    }

    //마이 페이지 응답 데이터
    @Setter
    @Getter
    public static class MyPageResponse {
        private Long id;
        private String name;
        private String intro;
        private String profileImage;

        @Builder
        public MyPageResponse(Long id, String name, String intro, String profileImage) {
            this.id = id;
            this.name = name;
            this.intro = intro;
            this.profileImage = profileImage;
        }
    }

    //작성자 응답 데이터
    public static class WriterResponse {
        private Long memberId;
        private String memberName;
        private String memberImage;

        @Builder
        public WriterResponse(Long memberId, String memberName, String memberImage) {
            this.memberId = memberId;
            this.memberName = memberName;
            this.memberImage = memberImage;
        }
    }
}
