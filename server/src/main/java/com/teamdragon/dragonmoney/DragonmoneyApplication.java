package com.teamdragon.dragonmoney;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DragonmoneyApplication {
	public static void main(String[] args) {
		SpringApplication.run(DragonmoneyApplication.class, args);
	}

}
