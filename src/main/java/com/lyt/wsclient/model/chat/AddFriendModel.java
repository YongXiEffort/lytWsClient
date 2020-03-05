package com.lyt.wsclient.model.chat;

public class AddFriendModel {

    private String addFriendRequestId;
    private String sendUserName;
    private String invitationMsg;
    private String sendUserImgPath;

    public String getAddFriendRequestId() {
        return addFriendRequestId;
    }

    public void setAddFriendRequestId(String addFriendRequestId) {
        this.addFriendRequestId = addFriendRequestId;
    }

    public String getSendUserName() {
        return sendUserName;
    }

    public void setSendUserName(String sendUserName) {
        this.sendUserName = sendUserName;
    }

    public String getInvitationMsg() {
        return invitationMsg;
    }

    public void setInvitationMsg(String invitationMsg) {
        this.invitationMsg = invitationMsg;
    }

    public String getSendUserImgPath() {
        return sendUserImgPath;
    }

    public void setSendUserImgPath(String sendUserImgPath) {
        this.sendUserImgPath = sendUserImgPath;
    }
}
