package com.teamdragon.dragonmoney.app.domain.category.service;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;

public interface CategoryFindService {

    // 카테고리 단일 조회 : id
    Category findCategoryById(Long categoryId);
}