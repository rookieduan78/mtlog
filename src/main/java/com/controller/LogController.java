package com.controller;

import com.entity.EsbLog;
import com.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class LogController {
    @Autowired
    private LogService logService;

    //跳转日志模块
    @RequestMapping(value = "esb")
    public String getLModel()
    {
        return "/page/esb/esb_list";
    }

    //查询所有日志
    @RequestMapping(value = "getEsbLog")
    @ResponseBody
    public List<EsbLog> getEsbLog(String callName,String resName,String dateKey,String status,String message,String endtime)
    {
        try {
            List<EsbLog> sendLogList = logService.selectEsbLog(callName,resName,dateKey,status,message,endtime);
            return sendLogList;
        }catch (Exception e){
            e.printStackTrace();
        }
            return  null;
    }
}
