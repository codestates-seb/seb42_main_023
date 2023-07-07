package com.teamdragon.dragonmoney.app.domain.image.repository;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long>, ImageRepositoryCustom {
}
