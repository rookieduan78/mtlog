package com.dao;

import com.entity.Record;
import com.entity.SendLog;
import com.entity.Store;
import com.mapper.ShopMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ShopDao {
    @Autowired
    private ShopMapper shopMapper;

    public Store findStore(String storeCode,String storePosword) {
        return  shopMapper.findStore(storeCode,storePosword);
    }

    public List<SendLog> selectSendLog(String storeName,String status) {
        return  shopMapper.selectSendLog(storeName,status);
    }

    public List<Record> getRecord(Map<String, Object> paramsMap) {
        return  shopMapper.getRecord(paramsMap);
    }

    public void insertRecord(Record rd) {
        shopMapper.insertRecord(rd);
    }

    public void insertSendLog(Record rd) {
        shopMapper.insertSendLog(rd);
    }

    public void updatePosword(String storeCode, String storeNewPosword) {
        shopMapper.updatePosword(storeCode,storeNewPosword);
    }

    public List<Record> findTodayRecord(String storeCode) {
        System.out.println(storeCode);
       return shopMapper.findTodayRecord(storeCode);
    }
}
