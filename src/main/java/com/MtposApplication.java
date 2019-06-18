package com;

import com.controller.config.DataSourceConfig1;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = {"com.controller","com.service","com.dao","com.controller.config"},
        exclude = {DataSourceAutoConfiguration.class})
@EnableScheduling
public class MtposApplication {

    public static void main(String[] args) {
        SpringApplication.run(MtposApplication.class, args);
    }

}
