package com.entity;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;
import java.util.List;

public class Orders {
    String SKTNO;   //终端号
    Date JYSJ;      //交易时间（包含时分秒）
    Date JZRQ;     //记账日期（不包含时分秒）
    Double XSJE;   //销售总金额
    String EWM;   //被调方小票二维码信
    List<Sktn> XSJLC;  //商品明细列表
    List<Skf>  XSJLM;   //支付明细列表

    public Orders() {
    }

    public Orders(String SKTNO, Date JYSJ, Date JZRQ, Double XSJE, String EWM, List<Sktn> XSJLC, List<Skf> XSJLM) {
        this.SKTNO = SKTNO;
        this.JYSJ = JYSJ;
        this.JZRQ = JZRQ;
        this.XSJE = XSJE;
        this.EWM = EWM;
        this.XSJLC = XSJLC;
        this.XSJLM = XSJLM;
    }

    public String getSKTNO() {
        return SKTNO;
    }

    public void setSKTNO(String SKTNO) {
        this.SKTNO = SKTNO;
    }

    public Date getJYSJ() {
        return JYSJ;
    }

    public void setJYSJ(Date JYSJ) {
        this.JYSJ = JYSJ;
    }

    public Date getJZRQ() {
        return JZRQ;
    }

    public void setJZRQ(Date JZRQ) {
        this.JZRQ = JZRQ;
    }

    public Double getXSJE() {
        return XSJE;
    }

    public void setXSJE(Double XSJE) {
        this.XSJE = XSJE;
    }

    public String getEWM() {
        return EWM;
    }

    public void setEWM(String EWM) {
        this.EWM = EWM;
    }

    public List<Sktn> getXSJLC() {
        return XSJLC;
    }

    public void setXSJLC(List<Sktn> XSJLC) {
        this.XSJLC = XSJLC;
    }

    public List<Skf> getXSJLM() {
        return XSJLM;
    }

    public void setXSJLM(List<Skf> XSJLM) {
        this.XSJLM = XSJLM;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "SKTNO='" + SKTNO + '\'' +
                ", JYSJ=" + JYSJ +
                ", JZRQ=" + JZRQ +
                ", XSJE=" + XSJE +
                ", EWM='" + EWM + '\'' +
                ", XSJLC=" + XSJLC +
                ", XSJLM=" + XSJLM +
                '}';
    }
}
