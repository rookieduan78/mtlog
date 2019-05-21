package com.entity;

public class Sktn {
    String SKTNO;   //终端号
    Double TCKT_INX; //分单号
    Double INX;      //序号
    String SPCODE;   //商品代码
    Double LSDJ;     //价格
    Double XSSL;     //数量
    Double XSJE;     //销售金额
    Double ZKJE;     //折扣金额
    Double YHJE;     //优惠金额

    public Sktn() {
    }

    public Sktn(String SKTNO, Double TCKT_INX, Double INX, String SPCODE, Double LSDJ, Double XSSL, Double XSJE, Double ZKJE, Double YHJE) {
        this.SKTNO = SKTNO;
        this.TCKT_INX = TCKT_INX;
        this.INX = INX;
        this.SPCODE = SPCODE;
        this.LSDJ = LSDJ;
        this.XSSL = XSSL;
        this.XSJE = XSJE;
        this.ZKJE = ZKJE;
        this.YHJE = YHJE;
    }

    public String getSKTNO() {
        return SKTNO;
    }

    public void setSKTNO(String SKTNO) {
        this.SKTNO = SKTNO;
    }

    public Double getTCKT_INX() {
        return TCKT_INX;
    }

    public void setTCKT_INX(Double TCKT_INX) {
        this.TCKT_INX = TCKT_INX;
    }

    public Double getINX() {
        return INX;
    }

    public void setINX(Double INX) {
        this.INX = INX;
    }

    public String getSPCODE() {
        return SPCODE;
    }

    public void setSPCODE(String SPCODE) {
        this.SPCODE = SPCODE;
    }

    public Double getLSDJ() {
        return LSDJ;
    }

    public void setLSDJ(Double LSDJ) {
        this.LSDJ = LSDJ;
    }

    public Double getXSSL() {
        return XSSL;
    }

    public void setXSSL(Double XSSL) {
        this.XSSL = XSSL;
    }

    public Double getXSJE() {
        return XSJE;
    }

    public void setXSJE(Double XSJE) {
        this.XSJE = XSJE;
    }

    public Double getZKJE() {
        return ZKJE;
    }

    public void setZKJE(Double ZKJE) {
        this.ZKJE = ZKJE;
    }

    public Double getYHJE() {
        return YHJE;
    }

    public void setYHJE(Double YHJE) {
        this.YHJE = YHJE;
    }

    @Override
    public String toString() {
        return "Sktn{" +
                "SKTNO='" + SKTNO + '\'' +
                ", TCKT_INX=" + TCKT_INX +
                ", INX=" + INX +
                ", SPCODE='" + SPCODE + '\'' +
                ", LSDJ=" + LSDJ +
                ", XSSL=" + XSSL +
                ", XSJE=" + XSJE +
                ", ZKJE=" + ZKJE +
                ", YHJE=" + YHJE +
                '}';
    }
}
