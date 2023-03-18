package com.teamdragon.dragonmoney.app.domain.category.service;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.category.repository.CategoryRepository;
import com.teamdragon.dragonmoney.app.global.exception.BusinessExceptionCode;
import com.teamdragon.dragonmoney.app.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // 카테고리 단일 조회 : id
    public Category findCategoryById(Long categoryId) {
        return findVerifyCategory(categoryId);
    }

    // 유효한 카테고리 조회
    private Category findVerifyCategory(Long categoryId) {
        Optional<Category> findCategory = categoryRepository.findById(categoryId);
        if (findCategory.isPresent()) {
            return findCategory.get();
        }
        throw new BusinessLogicException(BusinessExceptionCode.CATEGORY_NOT_FOUND);
    }
}
