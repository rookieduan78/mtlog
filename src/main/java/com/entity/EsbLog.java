package com.entity;

public class EsbLog {
    String RESPONEMESSAGE;
    String   REQUESTMESSAGE;
    String  STARTTIME;
    String  ENDTIME;
    String  STATUS;
    String  CALLERWEB;
    String  RETURNWEB;
    String  UNIQUENUM;

    public EsbLog(String RESPONEMESSAGE, String REQUESTMESSAGE, String STARTTIME, String ENDTIME, String STATUS, String CALLERWEB, String RETURNWEB, String UNIQUENUM) {
        this.RESPONEMESSAGE = RESPONEMESSAGE;
        this.REQUESTMESSAGE = REQUESTMESSAGE;
        this.STARTTIME = STARTTIME;
        this.ENDTIME = ENDTIME;
        this.STATUS = STATUS;
        this.CALLERWEB = CALLERWEB;
        this.RETURNWEB = RETURNWEB;
        this.UNIQUENUM = UNIQUENUM;
    }

    public String getRESPONEMESSAGE() {
        return RESPONEMESSAGE;
    }

    public void setRESPONEMESSAGE(String RESPONEMESSAGE) {
        this.RESPONEMESSAGE = RESPONEMESSAGE;
    }

    public String getREQUESTMESSAGE() {
        return REQUESTMESSAGE;
    }

    public void setREQUESTMESSAGE(String REQUESTMESSAGE) {
        this.REQUESTMESSAGE = REQUESTMESSAGE;
    }

    public String getSTARTTIME() {
        return STARTTIME;
    }

    public void setSTARTTIME(String STARTTIME) {
        this.STARTTIME = STARTTIME;
    }

    public String getENDTIME() {
        return ENDTIME;
    }

    public void setENDTIME(String ENDTIME) {
        this.ENDTIME = ENDTIME;
    }

    public String getSTATUS() {
        return STATUS;
    }

    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS;
    }

    public String getCALLERWEB() {
        return CALLERWEB;
    }

    public void setCALLERWEB(String CALLERWEB) {
        this.CALLERWEB = CALLERWEB;
    }

    public String getRETURNWEB() {
        return RETURNWEB;
    }

    public void setRETURNWEB(String RETURNWEB) {
        this.RETURNWEB = RETURNWEB;
    }

    public String getUNIQUENUM() {
        return UNIQUENUM;
    }

    public void setUNIQUENUM(String UNIQUENUM) {
        this.UNIQUENUM = UNIQUENUM;
    }
}
