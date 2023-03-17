package com.teamdragon.dragonmoney;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DragonmoneyApplicationTests {

	// aws s3 서비스 연동으로 인한 예외 방지처리
	static {
		System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
	}

	@Test
	void contextLoads() {
	}

}
