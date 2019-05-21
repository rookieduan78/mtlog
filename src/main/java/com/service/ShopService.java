package com.service;

import com.entity.Record;
import com.entity.SendLog;
import com.entity.Store;

import java.util.List;
import java.util.Map;

public interface ShopService {

    Store findStore(String storeCode,String storePosword);

    List<SendLog> selectSendLog(String storeName,String status);

    List<Record> getRecord(Map<String, Object> paramsMap);

    void sendRecord(String ids) throws  Exception;

    void updatePosword(String storeCode, String storeNewPosword);

    //查询当天的单子
    List<Record> findTodayRecord(String storeCode);
}
