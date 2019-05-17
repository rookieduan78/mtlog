package com.mapper;

import com.entity.Record;
import com.entity.SendLog;
import com.entity.Store;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Mapper
@Component("ShopMapper")
public interface ShopMapper {


    Store findStore(@Param("storeCode") String storeCode,@Param("storePosword") String storePosword);

    List<SendLog> selectSendLog(@Param("storeName") String storeName,@Param("status") String status);

    List<Record> getRecord(Map<String, Object> paramsMap);

    void insertRecord(Record rd);

    void insertSendLog(Record rd);

    void updatePosword(@Param("storeCode") String storeCode,@Param("storeNewPosword") String storeNewPosword);
}