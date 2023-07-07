package com.teamdragon.dragonmoney;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@Slf4j
@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
public class DragonmoneyApplication {

	public static void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		log.info("=== TimeSet Asia/Seoul ===");
	}

	public static void main(String[] args) {
		started();
		SpringApplication.run(DragonmoneyApplication.class, args);
	}

}
