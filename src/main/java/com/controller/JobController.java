package com.controller;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class JobController {
    //@Scheduled(cron="0/5 * *  * * ? ")
    public void testTimer(){
        System.out.println("第一个定时任务");
    }

    //@Scheduled(cron="0/6 * *  * * ? ")
    public void testTimer2(){
        System.out.println("第二个定时任务");
    }
}
