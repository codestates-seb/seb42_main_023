package com.teamdragon.dragonmoney.app.global.config;

import org.apache.http.HttpHeaders;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient housePriceWebClient() {
        return WebClient.builder()
                .baseUrl("http://openapi.seoul.go.kr:8088")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

}

//    Mono<Posts> stringMono = WebClient.builder()
//            .baseUrl("")
//            .build()
//            .get()
//            .uri(uriBuilder -> uriBuilder.path("")
//                    .queryParam("paramName", query)
//                    .build()
//            )
//            .header("Authentication", "kakaoAK ")
//            .exchangeToMono(clientResponse -> {
//                return clientResponse.bodyToMono(Posts.class);
//            });
//            return stringMono.block();


//		          urlBuilder.append("/" +  URLEncoder.encode("sample","UTF-8") ); /*인증키 (sample사용시에는 호출시 제한됩니다.)*/
//                urlBuilder.append("/" +  URLEncoder.encode("xml","UTF-8") ); /*요청파일타입 (xml,xmlf,xls,json) */
//                urlBuilder.append("/" + URLEncoder.encode("CardSubwayStatsNew","UTF-8")); /*서비스명 (대소문자 구분 필수입니다.)*/
//                urlBuilder.append("/" + URLEncoder.encode("1","UTF-8")); /*요청시작위치 (sample인증키 사용시 5이내 숫자)*/
//                urlBuilder.append("/" + URLEncoder.encode("5","UTF-8")); /*요청종료위치(sample인증키 사용시 5이상 숫자 선택 안 됨)*/
//// 상위 5개는 필수적으로 순서바꾸지 않고 호출해야 합니다.