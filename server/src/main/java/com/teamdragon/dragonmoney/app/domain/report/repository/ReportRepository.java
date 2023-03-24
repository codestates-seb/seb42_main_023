package com.teamdragon.dragonmoney.app.domain.report.repository;

import com.teamdragon.dragonmoney.app.domain.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository  extends JpaRepository<Report, Long>, ReportRepositoryCustom {

}
