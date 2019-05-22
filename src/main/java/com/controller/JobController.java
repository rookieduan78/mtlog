package com.controller;

import com.alibaba.fastjson.JSONObject;
import com.dao.ShopDao;
import com.entity.Record;
import com.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Component
public class JobController {
    @Autowired
    private ShopService shopService;
    @Autowired
    private ShopDao shopdao;
    //@Scheduled(cron="0/10 *  *  * * ? ")
    //  @Scheduled(cron="0 20 14 * * ?")
    public void testTimer(){
        String storeCode="BF0238";
        System.out.println("第一个定时任务");
        this.dotask(storeCode);
    }

    //@Scheduled(cron="0/6 * *  * * ? ")
    public void testTimer2(){
        System.out.println("第二个定时任务");
    }

    public void dotask(String storeCode){
        //查询当天的单子
        List<Record> recordList=shopService.findTodayRecord(storeCode);
        Record rd=null;
        if (recordList.size()>0){
            for (Record record:recordList) {
                Date currentTime = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String dateString = formatter.format(currentTime);
                rd=new Record();
                rd.setOrderNo(record.getOrderNo());
                rd.setStoreCode(record.getStoreCode());
                rd.setStoreName(record.getStoreName());
                rd.setDateKey(record.getDateKey());
                rd.setTransTypeName(record.getTransTypeName());
                rd.setTotalAmt(record.getTotalAmt());
                rd.setTotalNet(record.getTotalNet());
                rd.setPaymentTypeName(record.getPaymentTypeName());
                rd.setOrderDetailid(record.getOrderDetailid());
                rd.setStatus(record.getStatus());
                rd.setSendTime(dateString);
                rd.setTransDate(record.getTransDate());
                //1.推送到商城
                //2.保存记录到订单表
                shopdao.insertRecord(rd);
                //3.保存操作记录
                //根据推送后返回的状态  确定status的值  先写死1
                rd.setStatus("0");
                shopdao.insertSendLog(rd);
            }
            System.out.println("成功调用");
        }
        //推送到
    }
}
