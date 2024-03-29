package com.teamdragon.dragonmoney.app.global.pagenation;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@NoArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private String orderby;

    @Builder
    public PageInfo(int page, int size, long totalElements, int totalPages, String orderBy) {
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.orderby = orderBy;
    }

    public static <T> PageInfo of(Page<T> page, String orderBy) {
        return PageInfo.builder()
                .page(page.getNumber() + 1)
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .orderBy(orderBy)
                .build();
    }
}