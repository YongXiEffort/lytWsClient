package com.lyt.wsclient.model.chat;

public class FriUserListModel {

    private String friUserId;
    private String friUserName;
    private Integer notReceptMsgCount = 0;
    private String content;

    public String getFriUserId() {
        return friUserId;
    }

    public void setFriUserId(String friUserId) {
        this.friUserId = friUserId;
    }

    public String getFriUserName() {
        return friUserName;
    }

    public void setFriUserName(String friUserName) {
        this.friUserName = friUserName;
    }

    public Integer getNotReceptMsgCount() {
        return notReceptMsgCount;
    }

    public void setNotReceptMsgCount(Integer notReceptMsgCount) {
        this.notReceptMsgCount = notReceptMsgCount;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
