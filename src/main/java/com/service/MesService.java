package com.service;
import com.entity.Orders;
import com.entity.Record;
import com.entity.Skf;
import com.entity.Sktn;
import com.utils.JsonDateValueProcessor;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MesService {
    public String  updateMesg(Record rd) throws  Exception{
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
        //第一个json
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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
        //JSONObject jsonXsjlc = JSONObject.fromObject(XSJLC);
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
        os.setJYSJ(sim.parse(rd.getTransDate()));
        os.setJZRQ(sdf.parse(rd.getDateKey()));
        os.setXSJE(rd.getTotalAmt());
        os.setEWM("");   //微信标识嘛
        os.setXSJLC(XSJLC);
        os.setXSJLM(XSJLM);
       // System.out.println(os);
        //1、使用JSONObject
        JSONObject json = JSONObject.fromObject(os, jsonConfig);
        //2、使用JSONArray
        JSONArray array= JSONArray.fromObject(os);

        String strJson=json.toString();
       // String strArray=array.toString();
        System.out.println("strJson:"+strJson);
        //System.out.println("strArray:"+strArray);
        return  null;
    }
}
