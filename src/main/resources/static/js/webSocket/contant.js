window.app = {
    CONNECT: 1,     // 第一次(或重连)初始化连接
    CHAT: 2,        // 聊天消息
    SIGNED: 3,      // 消息签收
    KEEPALIVE: 4,   // 客户端保持心跳
    PULL_FRIEND:5,  // 重新拉取好友
    PULL_CHAT_MSG:6, //拉去用户聊天消息
    ADD_FRIEND:7, //请求加好友
    ADD_FRIEND_REPONSE:8, //好友请求回复
    ADD_FRIEND_REPONSE_AGREE:9, //好友请求回复同意
    ADD_FRIEND_REPONSE_REJECT:10, //好友请求回复拒绝

    // 消息模型的构造函数
    ChatMsg: function(senderId, receiverId, msg, msgId, sendTime, contentType){
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.msg = msg;
        this.msgId = msgId;
        this.sendTime = sendTime;
        this.contentType = contentType;
    },

    //  进一步封装两个得到最终版消息模型的构造函数
    DataContent: function(action, chatMsg, extand){
        this.action = action;
        this.chatMsg = chatMsg;
        this.extand = extand;
    }
}