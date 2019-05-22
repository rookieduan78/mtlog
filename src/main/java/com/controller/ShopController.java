package com.controller;
import com.entity.Record;
import com.entity.SendLog;
import com.entity.Store;
import com.service.ShopService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ShopController {
    @Autowired
    private ShopService shopService;
    private static final Logger logger = LoggerFactory.getLogger(ShopController.class);
    //跳转登录页
    @RequestMapping(value = "login")
    public String getLogin()
    {
        return  "login";
    }
    //跳转首页
    @RequestMapping(value = "getIndex")
    @ResponseBody
    public Map<String, Object> getIndex(String storeCode, String storePosword, HttpServletRequest request)
    {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String flag ="";
        Store st=shopService.findStore(storeCode,storePosword);
        if (st==null){
            flag="0";
        }else{
            HttpSession session = request.getSession();
            session.setAttribute("st", st);
            session.setMaxInactiveInterval(30*60);
            //session.setMaxInactiveInterval(1*3600*1000);
           // session.setTimeout(7*24*3600*1000);// 7天
            flag="2";
        }
        resultMap.put("result", flag);
        return resultMap;
    }

    //修改密码
    @RequestMapping(value = "updatePosword")
    @ResponseBody
    public Map<String, Object> updatePosword(String storeCode, String storePosword,String storeNewPosword)
    {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String flag ="";
        Store st=shopService.findStore(storeCode,storePosword);
        if (st==null){
            flag="0";
        }else{
            shopService.updatePosword(storeCode,storeNewPosword);
            flag="2";
        }
        resultMap.put("result", flag);
        return resultMap;
    }


    //跳转日志模块
    @RequestMapping(value = "getLModel")
    public String getLModel()
    {
        return "/page/resource/resource_list";
    }

    //查询所有日志
    @RequestMapping(value = "getAllSendLog")
    @ResponseBody
    public List<SendLog> getAllRecord(String storeName,String status)
    {
        List<SendLog> sendLogList = shopService.selectSendLog(storeName,status);
        return sendLogList;
    }
    //跳转门店订单模块
    @RequestMapping(value = "getLRecordModel")
    public String getLRecordModel()
    {
        return "/page/module/module_list";
    }

    //查询所有订单
    @RequestMapping(value = "getRecord")
    @ResponseBody
    public List<Record> getRecord(String orderNo, String dateKey,String status, HttpServletRequest request)
    {
        HttpSession session = request.getSession();
        Store store= (Store) session.getAttribute("st");

        Map<String, Object> paramsMap = new HashMap<String, Object>();
      /*  paramsMap.put("page", pageNumber);
        paramsMap.put("size", pageSize);*/
        paramsMap.put("orderNo", orderNo);
        paramsMap.put("dateKey", dateKey);
        paramsMap.put("status", status);
        paramsMap.put("storecode", store.getStoreCode());
        List<Record> recordList = shopService.getRecord(paramsMap);
        return recordList;
    }

    //推送选中数据
    @RequestMapping(value = "sendRecord")
    @ResponseBody
    public Map<String, Object> sendRecord(String params)
    {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
            shopService.sendRecord(params);
            result.put("status", "success");
        } catch (Exception e) {
            logger.error("doDeleteEntity：", e);
            result.put("status", "fail");
        }
        return result;
    }

}

