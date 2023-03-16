package com.teamdragon.dragonmoney;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations="classpath:application-local.yml")
class DragonmoneyApplicationTests {

	@Test
	void contextLoads() {
	}

}
