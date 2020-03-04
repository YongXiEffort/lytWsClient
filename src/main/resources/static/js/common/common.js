$(function(){

    // 绑定 Chat 导航栏的搜索框内容变化事件
    $("#chatUserSearchText").bind('input porpertychange',function(){
        console.log(" chat search text : " + $("#chatUserSearchText").val());
    });

    // 默认开始就加载 Chat 导航栏
    showChatsSidebarBody();
    // 初始化websocket
    initWs();
    // 聊天对话框发送文本消息
    $(document).on('submit', '.layout .content .chat .chat-footer form', function (e) {
        e.preventDefault();

        var input = $(this).find('input[type=text]');
        var message = input.val();

        message = $.trim(message);

        if (message) {
            // 发送消息
            var friUserId = $("#friUserId").val();
            var array = new Array();
            array.push(new app.ChatMsg(null, friUserId, message, null, null, 1));
            var dataContent = new app.DataContent(app.CHAT, array, null);
            wsChat(JSON.stringify(dataContent));
            ChatMsgDeal.Message.add(message, 'outgoing-message', new Date());
            input.val('');
            $("#ulbLastText" + friUserId).text(message);
        } else {
            input.focus();
        }
    });

});

/**
 * 加载 Chat 导航栏
 */
function showChatsSidebarBody() {

    $.ajax({
        url: context_path + "/chatC/getChatsSidebarBodyPage",
        type: "GET",
        async : false,
        dataType: "html",
        success: function (data) {
            $("#chats-sidebar-body-lyt").empty();
            $("#chats-sidebar-body-lyt").html(data);
        },
        error: function (reqText) {
            alert("请求失败[" + reqText.status + "]");
        }
    });

}

/**
 * 加载 Chat 聊天对话框html页面，发送拉取聊天消息内容的websocket请求
 */
function sendChatBodyRequest(friUserId) {

    $.ajax({
        url: context_path + "/chatC/getChatBodyPage",
        type: "GET",
        async : false,
        data : {
            "friUserId" : friUserId
        },
        dataType: "html",
        success: function (data) {
            $("#chats-body-lyt").empty();
            $("#chats-body-lyt").html(data);
        },
        error: function (reqText) {
            alert("请求失败[" + reqText.status + "]");
        }
    });
    // chat导航栏增加当前聊天好友的样式
    $("#lgi" + friUserId).attr("class","list-group-item open-chat");
    // 发送拉取与好友的聊天内容请求到netty服务器
    var array = new Array();
    array.push(new app.ChatMsg(friUserId, null, null, null, null, null));
    var dataContent = new app.DataContent(app.PULL_CHAT_MSG, array, null);
    wsChat(JSON.stringify(dataContent));

}

/**
 * 展示聊天对话框消息内容
 * @param chatMsgList
 */
function showChatBody(chatMsgList) {
    var currentUserId = $("#currentUserId").val();
    $("#figure" + chatMsgList[0].senderId).attr("class","avatar");
    $("#ulaat" + chatMsgList[0].senderId).css('display','');
    $("#ulanmc" + chatMsgList[0].senderId).text(0);
    $("#ula" + chatMsgList[0].senderId).css('display','none');
    if (chatMsgList != null && chatMsgList != undefined) {
        for (var i=0;i<chatMsgList.length;i++) {
            if (chatMsgList[i].senderId != currentUserId) {
                console.log(" chatMsgList[i].msg : " + chatMsgList[i].msg);
                ChatMsgDeal.Message.add(chatMsgList[i].msg, null, chatMsgList[i].sendTime);
            } else {
                console.log(" chatMsgList[i].msg : " + chatMsgList[i].msg);
                ChatMsgDeal.Message.add(chatMsgList[i].msg, 'outgoing-message', chatMsgList[i].sendTime);
            }
        }
    }

}

/**
 * 聊天对话框的消息内容加载
 * @type {{Message: {add: ChatMsgDeal.Message.add}}}
 */
var ChatMsgDeal = {
    Message: {
        add: function (message, type, sendTime) {
            var chat_body = $('.layout .content .chat .chat-body');
            if (chat_body.length > 0) {

                type = type ? type : '';
                message = message ? message : 'Lorem ipsum dolor sit amet.';
                sendTime = sendTime ? sendTime : '';

                $('.layout .content .chat .chat-body .messages').append('<div class="message-item ' + type + '"><div class="message-content">' + message + '</div><div class="message-action">' + sendTime + (type ? '<i class="ti-check"></i>' : '') + '</div></div>');

                chat_body.scrollTop(chat_body.get(0).scrollHeight, -1);
            }
        }
    }
};

function showNewMsg(dataContent) {
    var chatMsg = dataContent.chatMsg[0];
    var friUserId = $("#friUserId");
    if (friUserId == null || friUserId == undefined) {
        //没有打开聊天对话框
        var chatsSidebarBodyId = $("#chats-sidebar-body-id");
        if (chatsSidebarBodyId == null || chatsSidebarBodyId == undefined ) {
            // 没有打开chat聊天导航栏
            $("#chats-navigation-atag").attr("class","notifiy_badge");
        } else {
            $("#chats-navigation-atag").attr("class","active");
            // 有打开chat聊天导航栏
            var sendMsgFriId = chatMsg.senderId;
            $("#figure" + sendMsgFriId).attr("class","avatar avatar-state-success");
            $("#ulaat" + sendMsgFriId).css('display','none');
            $("#ulanmc" + sendMsgFriId).text(dataContent.extand);
            $("#ula" + sendMsgFriId).css('display',' ');
            $("#ulbLastText" + sendMsgFriId).text(chatMsg.msg);
        }
    } else {
        //已打开聊天对话框
        friUserId = $("#friUserId").val();
        $("#ulbLastText" + sendMsgFriId).text(chatMsg.msg);
        if (friUserId != chatMsg.senderId) {
            // 当前聊天对话框不是发送消息过来的好友的对话框
            var sendMsgFriId = chatMsg.senderId;
            $("#figure" + sendMsgFriId).attr("class","avatar avatar-state-success");
            $("#ulaat" + sendMsgFriId).css('display','none');
            $("#ulanmc" + sendMsgFriId).text(dataContent.extand);
            $("#ula" + sendMsgFriId).css('display',' ');
        } else {
            ChatMsgDeal.Message.add(chatMsg.msg, null, chatMsg.sendTime);
            // 发送读消息回执
            var array = new Array();
            array.push(new app.ChatMsg(friUserId, null, null, chatMsg.msgId, null, null));
            var dataContent = new app.DataContent(app.SIGNED, array, null);
            wsChat(JSON.stringify(dataContent));
        }
    }
}

function sendMsgToFri() {
    var sendFriMsg = $("#chat-Footer-text").val();

}