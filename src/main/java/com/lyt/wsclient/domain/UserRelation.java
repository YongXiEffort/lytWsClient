package com.lyt.wsclient.domain;

import java.util.Date;

public class UserRelation {

    private String userId;
    private String friUserId;
    private String isAble;
    private Date lastChatTime;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFriUserId() {
        return friUserId;
    }

    public void setFriUserId(String friUserId) {
        this.friUserId = friUserId;
    }

    public String getIsAble() {
        return isAble;
    }

    public void setIsAble(String isAble) {
        this.isAble = isAble;
    }

    public Date getLastChatTime() {
        return lastChatTime;
    }

    public void setLastChatTime(Date lastChatTime) {
        this.lastChatTime = lastChatTime;
    }
}
