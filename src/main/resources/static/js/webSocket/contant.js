window.app = {
    CONNECT: 1,     // 第一次(或重连)初始化连接
    CHAT: 2,        // 聊天消息
    SIGNED: 3,      // 消息签收
    KEEPALIVE: 4,   // 客户端保持心跳
    PULL_FRIEND:5,  // 重新拉取好友

// 消息模型的构造函数
    ChatMsg: function(senderId, receiverId, msg, msgId){
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.msg = msg;
        this.msgId = msgId;
    },

//  进一步封装两个得到最终版消息模型的构造函数
    DataContent: function(action, chatMsg, extand){
        this.action = action;
        this.chatMsg = chatMsg;
        this.extand = extand;
    }
}