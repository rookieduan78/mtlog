package com.service.impl;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dao.ShopDao;
import com.entity.Record;
import com.entity.SendLog;
import com.entity.Store;
import com.service.ShopService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ShopServiceImpl implements ShopService {
    private static Logger logger = LoggerFactory.getLogger(ShopServiceImpl.class);
    @Autowired
    private ShopDao shopdao;

    @Override
    public Store findStore(String storeCode,String storePosword) {
        return shopdao.findStore(storeCode,storePosword);
    }

    @Override
    public List<SendLog> selectSendLog(String storeName,String status) {
        return shopdao.selectSendLog(storeName,status);
    }

    @Override
    public List<Record> getRecord(Map<String, Object> paramsMap) {
        return shopdao.getRecord(paramsMap);
    }
    @Override
    @Transactional
    public void sendRecord(String params) {

        Record rd=null;
        //List<Record> relationList=new ArrayList<Record>();
        JSONArray jsonArray =  JSON.parseArray(params);
        for(Object ob : jsonArray){
            Date currentTime = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = formatter.format(currentTime);
            com.alibaba.fastjson.JSONObject jt = (JSONObject) ob;
            rd=new Record();
            rd.setOrderNo(jt.getString("orderNo"));
            rd.setStoreCode(jt.getString("storeCode"));
            rd.setStoreName(jt.getString("storeName"));
            rd.setDateKey(jt.getString("dateKey"));
            rd.setTransTypeName(jt.getString("transTypeName"));
            rd.setTotalAmt(jt.getDouble("totalAmt"));
            rd.setTotalNet(jt.getDouble("totalNet"));
            rd.setPaymentTypeName(jt.getString("paymentTypeName"));
            rd.setOrderDetailid(jt.getString("orderDetailid"));
            rd.setStatus(jt.getString("status"));
            rd.setSendTime(dateString);
            rd.setTransDate(jt.getDate("transDate"));
            System.out.println(rd);
            //1.推送到商城
            //2.保存记录到订单表
            shopdao.insertRecord(rd);
            //3.保存操作记录
            //根据推送后返回的状态  确定status的值  先写死1
            rd.setStatus("0");
            shopdao.insertSendLog(rd);
           // relationList.add(rd);
        }
    }

    @Override
    public void updatePosword(String storeCode, String storeNewPosword) {
        shopdao.updatePosword(storeCode,storeNewPosword);
    }
}
