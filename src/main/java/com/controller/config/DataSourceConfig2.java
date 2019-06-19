package com.controller.config;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;
@Configuration
@MapperScan(value = "com.mapper2", sqlSessionTemplateRef  = "mysql2SqlSessionTemplate")
public class DataSourceConfig2 {
    @Bean(name = "mysql2DataSource")
    @ConfigurationProperties(prefix = "datasource.slave")
    public DataSource testDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "mysql2SqlSessionFactory")
    //  @Primary
    public SqlSessionFactory testSqlSessionFactory(@Qualifier("mysql2DataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);                                                          //LogMapper
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:com/mapper2/*.xml"));
        return bean.getObject();
    }

    @Bean(name = "mysql2TransactionManager")
    //   @Primary
    public DataSourceTransactionManager testTransactionManager(@Qualifier("mysql2DataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "mysql2SqlSessionTemplate")
    //   @Primary
    public SqlSessionTemplate testSqlSessionTemplate(@Qualifier("mysql2SqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

}

