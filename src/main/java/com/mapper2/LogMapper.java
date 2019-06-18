package com.mapper2;

import com.entity.EsbLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component("LogMapper")
public interface LogMapper {
        List<EsbLog> selectEsbLog(@Param("callName") String callName,@Param("resName") String resName,
                                  @Param("dateKey") String dateKey,@Param("status") String status);
}
