package com.vhl.webapi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = RedisAutoConfiguration.class)
@EnableScheduling
public class WebApiApplication {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(WebApiApplication.class);

        app.addListeners(event -> {
            if (event instanceof ApplicationEnvironmentPreparedEvent envEvent) {
                System.out.println("==== ALL ENVIRONMENT PROPERTIES ====");
                envEvent.getEnvironment().getPropertySources().forEach(ps -> {
                    System.out.println("-> Source: " + ps.getName());
                });
                String url = envEvent.getEnvironment().getProperty("spring.datasource.url");
                System.out.println("==== spring.datasource.url = " + url);
            }
        });

        app.run(args);
    }
}

