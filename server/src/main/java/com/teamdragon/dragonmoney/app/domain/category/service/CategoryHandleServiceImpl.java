package com.teamdragon.dragonmoney.app.domain.category.service;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import com.teamdragon.dragonmoney.app.domain.category.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class CategoryHandleServiceImpl implements CategoryHandleService {

    private final CategoryRepository categoryRepository;

    public CategoryHandleServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
        List<Category> findCategories = categoryRepository.findAll();
        if(findCategories.size() == 0) {
            categoryRepository.save(new Category("firstCategoryTitle", "firstCategoryContent"));
        }
    }
}