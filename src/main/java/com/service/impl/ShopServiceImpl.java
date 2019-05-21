package com.service.impl;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dao.ShopDao;
import com.entity.*;
import com.service.MesService;
import com.service.ShopService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ShopServiceImpl implements ShopService {
    private static Logger logger = LoggerFactory.getLogger(ShopServiceImpl.class);
    @Autowired
    private ShopDao shopdao;

    @Autowired
    private MesService mesService;

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
    public void sendRecord(String params) throws  Exception{
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
            rd.setTransDate(jt.getString("transDate"));
            //三条数据
            rd.setProdCode(jt.getString("prodCode"));
            rd.setUnitprice(jt.getString("unitprice"));
            rd.setQuantity(jt.getString("quantity"));
            System.out.println(rd);
            //1.推送到商城
            mesService.updateMesg(rd);
            //2.保存记录到订单表
            shopdao.insertRecord(rd);
            //3.保存操作记录
            //根据推送后返回的状态  确定status的值  先写死1
            rd.setStatus("0");
            shopdao.insertSendLog(rd);
           // relationList.add(rd);
        }
    }
   //组装数据
   /* public String  updateMesg(Record rd) throws  Exception{
        //第一个json
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Sktn sk=new Sktn();
        sk.setSKTNO("123456"); //终端号  先固定
        sk.setTCKT_INX(Double.parseDouble(rd.getOrderNo()));
        //sk.setINX();   //序号
        sk.setSPCODE(rd.getProdCode());
        sk.setLSDJ(Double.parseDouble(rd.getUnitprice()));
        sk.setXSSL(Double.parseDouble(rd.getQuantity()));
        sk.setXSJE(rd.getTotalAmt());
        //sk.setZKJE();
        //sk.setYHJE();
        List<Sktn> XSJLC =new ArrayList<>();
        XSJLC.add(sk);
        //第二个j'son
        //组装
        Skf sf=new Skf();
        sf.setSKTNO("123456");
        sf.setSKFS(Double.parseDouble("2"));
        sf.setSKJE(Double.parseDouble("2"));
        List<Skf> XSJLM=new ArrayList<>();
        XSJLM.add(sf);

        Orders os=new Orders();
        os.setSKTNO("123456");  //终端号  先固定
        os.setJYSJ(rd.getTransDate());
        os.setJZRQ(sdf.parse(rd.getDateKey()));
        os.setXSJE(rd.getTotalAmt());
        os.setEWM("");   //微信标识嘛
        os.setXSJLC(XSJLC);
        os.setXSJLM(XSJLM);
        System.out.println(os);
        //1、使用JSONObject
        JSONObject json = JSONObject.fromObject(os);
        //2、使用JSONArray
        JSONArray array= JSONArray.fromObject(os);

        String strJson=json.toString();
        String strArray=array.toString();

        System.out.println("strJson:"+strJson);
        System.out.println("strArray:"+strArray);
        return  null;
    }*/





    @Override
    public void updatePosword(String storeCode, String storeNewPosword) {
        shopdao.updatePosword(storeCode,storeNewPosword);
    }

    @Override
    public List<Record> findTodayRecord(String storeCode) {
        return shopdao.findTodayRecord(storeCode);
    }
}
