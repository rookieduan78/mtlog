package com.service.impl;

import com.dao.LogDao;
import com.entity.EsbLog;
import com.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogServiceImpl implements LogService {
@Autowired
private LogDao logdao;
    @Override
    public List<EsbLog> selectEsbLog(String callName,String resName,String dateKey,String status) {
        return logdao.selectEsbLog(callName,resName,dateKey,status);
    }
}
