package com.entity;

public class Skf {
    String SKTNO;  //终端号     收款台号
    Double SKFS;    //支付方式
    Double SKJE;    //支付金额

    public Skf() {
    }

    public Skf(String SKTNO, Double SKFS, Double SKJE) {
        this.SKTNO = SKTNO;
        this.SKFS = SKFS;
        this.SKJE = SKJE;
    }

    public String getSKTNO() {
        return SKTNO;
    }

    public void setSKTNO(String SKTNO) {
        this.SKTNO = SKTNO;
    }

    public Double getSKFS() {
        return SKFS;
    }

    public void setSKFS(Double SKFS) {
        this.SKFS = SKFS;
    }

    public Double getSKJE() {
        return SKJE;
    }

    public void setSKJE(Double SKJE) {
        this.SKJE = SKJE;
    }

    @Override
    public String toString() {
        return "Skf{" +
                "SKTNO='" + SKTNO + '\'' +
                ", SKFS=" + SKFS +
                ", SKJE=" + SKJE +
                '}';
    }
}
