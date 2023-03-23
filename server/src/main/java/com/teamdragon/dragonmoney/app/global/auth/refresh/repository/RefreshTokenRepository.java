package com.teamdragon.dragonmoney.app.global.auth.refresh.repository;

import com.teamdragon.dragonmoney.app.global.auth.refresh.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

}
