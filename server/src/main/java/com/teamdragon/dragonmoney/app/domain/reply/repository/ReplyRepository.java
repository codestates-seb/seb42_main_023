package com.teamdragon.dragonmoney.app.domain.reply.repository;

import com.teamdragon.dragonmoney.app.domain.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long>, ReplyRepositoryCustom {
}
