package com.teamdragon.dragonmoney.app.domain.image.repository;

import com.teamdragon.dragonmoney.app.domain.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long>, ImageRepositoryCustom {
    Optional<Image> findByFileName(String fileName);
}
