$(function(){

    // 绑定 Chat 导航栏的搜索框内容变化事件
    $("#chatUserSearchText").bind('input porpertychange',function(){
        console.log(" chat search text : " + $("#chatUserSearchText").val());
    });

    // 默认开始就加载 Chat 导航栏
    showChatsSidebarBody();
    initWs();

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
 * 加载 Chat 聊天对话框
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

    var arry = new Array();
    arry.push(new app.ChatMsg(friUserId, null, null, null, null, null));
    var dataContent = new app.DataContent(app.PULL_CHAT_MSG, arry, null);
    wsChat(JSON.stringify(dataContent));

}

function showChatBody(chatMsgList) {
    var currentUserId = $("#currentUserId").val();
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

var ChatMsgDeal = {
    Message: {
        add: function (message, type, sendTime) {
            var chat_body = $('.layout .content .chat .chat-body');
            if (chat_body.length > 0) {

                type = type ? type : '';
                message = message ? message : 'Lorem ipsum dolor sit amet.';
                sendTime = sendTime ? sendTime : '';

                $('.layout .content .chat .chat-body .messages').append('<div class="message-item ' + type + '"><div class="message-content">' + message + '</div><div class="message-action">' + sendTime + (type ? '<i class="ti-check"></i>' : '') + '</div></div>');

                chat_body.scrollTop(chat_body.get(0).scrollHeight, -1).niceScroll({
                    cursorcolor: 'rgba(66, 66, 66, 0.20)',
                    cursorwidth: "4px",
                    cursorborder: '0px'
                });
            }
        }
    }
};