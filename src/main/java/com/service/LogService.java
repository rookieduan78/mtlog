package com.service;

import com.entity.EsbLog;

import java.util.List;

public interface LogService {
    List<EsbLog> selectEsbLog(String callName,String resName,String dateKey,String status,String message,String endtime);
}
