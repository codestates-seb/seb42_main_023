package com.teamdragon.dragonmoney.app.global.auth.refresh.repository;

import com.teamdragon.dragonmoney.app.global.auth.refresh.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

}
