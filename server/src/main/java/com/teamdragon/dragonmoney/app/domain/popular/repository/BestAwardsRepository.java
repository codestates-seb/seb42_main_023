package com.teamdragon.dragonmoney.app.domain.popular.repository;

import com.teamdragon.dragonmoney.app.domain.popular.entity.BestAwards;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BestAwardsRepository extends JpaRepository<BestAwards, Long> {
}
