package com.dao;

import com.entity.EsbLog;
import com.mapper.LogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LogDao {
    @Autowired
    private LogMapper logmapper;
    public List<EsbLog> selectEsbLog(String callName,String resName,String dateKey,String status) {
        return logmapper.selectEsbLog(callName,resName,dateKey,status);
    }
}
