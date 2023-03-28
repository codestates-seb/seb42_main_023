package com.teamdragon.dragonmoney.app.domain.member.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class MemberDto {

    // 회원 가입
    @Getter
    @NoArgsConstructor
    public static class DuplicatedReq {
        @NotNull(message = "내용을 입력해주세요.")
        @NotBlank(message = "공백은 불가능합니다.")
        @Size(min = 2, max = 30)
        @Pattern(regexp = "^[0-9A-Za-z가-힣]{2,30}$",
                message = "숫자, 영어, 한글이 포함된 2글자 이상 8글자 이하 이름만 사용 가능합니다.")
        private String name;

        @NotNull
        private String tempName;

        public DuplicatedReq(String name, String tempName) {
            this.name = name;
            this.tempName = tempName;
        }
    }

    // 닉네임 중복 검사 및 회원 가입 결과
    @Getter
    public static class DuplicatedRes {
        private Boolean useable;

        public DuplicatedRes(Boolean useable) {
            this.useable = useable;
        }
    }

    // 회원 수정
    @Getter
    @NoArgsConstructor
    public static class PatchReq {
        @NotNull(message = "내용을 입력해주세요.")
        @NotBlank(message = "공백은 불가능합니다.")
        @Size(max = 500, message = "60글자 이내로 작성 가능합니다.")
        private String intro;

        public PatchReq(String intro) {
            this.intro = intro;
        }
    }

    // 자기소개 수정
    @Getter
    public static class IntroResponse {
        private String intro;

        public IntroResponse(String intro) {
            this.intro = intro;
        }
    }
}