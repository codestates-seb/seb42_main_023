package com.teamdragon.dragonmoney.app.domain.category.repository;

import com.teamdragon.dragonmoney.app.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
