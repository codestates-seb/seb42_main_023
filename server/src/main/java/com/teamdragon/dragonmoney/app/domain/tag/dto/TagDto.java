package com.teamdragon.dragonmoney.app.domain.tag.dto;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class TagDto {
    @Getter
    public static class TagName {
        @Pattern(regexp = "^[0-9a-zA-Zㄱ-ㅎ가-힣 ]*$")
        @NotBlank
        @Length(min=1, max=10)
        private String tagName;

        public TagName(Tag tag) {
            this.tagName = tag.getName();
        }
    }
}
