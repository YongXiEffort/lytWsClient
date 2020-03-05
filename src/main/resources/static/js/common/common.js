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

                chat_body.scrollTop(chat_body.get(0).scrollHeight, -1).niceScroll({
                    cursorcolor: 'rgba(66, 66, 66, 0.20)',
                    cursorwidth: "4px",
                    cursorborder: '0px'
                }).resize();
            }
        }
    }
};

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
            $("#friends-sidebar-body-lyt").empty();
            $("#chats-sidebar-body-lyt").empty();
            $("#chats-sidebar-body-lyt").html(data);
        },
        error: function (reqText) {
            alert("请求失败[" + reqText.status + "]");
        }
    });
    var friUserId = $("#friUserId").val();
    if (friUserId != null && friUserId != undefined) {
        $("#lgi" + friUserId).attr("class","list-group-item open-chat");
    }

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
    var lgiElements = document.getElementsByClassName("list-group-item");
    for (var i=0;i<lgiElements.length;i++) {
        lgiElements[i].setAttribute("class", "list-group-item");
    }
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
 * 在聊天对话框展示新接收的聊天信息
 * @param dataContent
 */
function showNewMsg(dataContent) {
    var chatMsg = dataContent.chatMsg[0];
    var friUserId = document.getElementById("friUserId");
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

/**
 * 加载好友导航栏Body
 */
function showFriendsSidebarBody() {
    $.ajax({
        url: context_path + "/friendsC/getFriendsSidebarBodyPage",
        type: "GET",
        async : false,
        dataType: "html",
        success: function (data) {
            $("#chats-sidebar-body-lyt").empty();
            $("#friends-sidebar-body-lyt").empty();
            $("#friends-sidebar-body-lyt").html(data);
        },
        error: function (reqText) {
            alert("请求失败[" + reqText.status + "]");
        }
    });
}

/**
 * 查找用户用于新加好友
 */
function searchWhichFriendYouWantToAdd() {
    var friendEmail = $("#emails").val();
    if (friendEmail == undefined || friendEmail == '') {
        alert("请输入用户的名称!");
        return;
    }
    $.ajax({
        url: context_path + "/friendsC/searchWhichFriendYouWantToAdd",
        type: "GET",
        async : false,
        data : {
            "friendUserName" : friendEmail
        },
        dataType: "json",
        success: function (data) {
            console.log("data :" + data);
            var addFriendModalShowFriMsgDiv = $("#addFriendModalShowFriMsgDiv");
            if (data.success) {
                if (data.message == null || data.message == '') {
                    var nameAlpha = friendEmail.substring(0,1);
                    addFriendModalShowFriMsgDiv.append("<div class=\"list-group-item\"><figure class=\"avatar\" style=\"float: left\"><span class=\"avatar-title bg-success rounded-circle\">" + nameAlpha + "</span></figure><div style=\"margin-left: 50px\" class=\"users-list-body\"><h5>" + friendEmail + "</h5></div></div>");
                } else {
                    addFriendModalShowFriMsgDiv.append("<div class=\"list-group-item\"><figure class=\"avatar\" style=\"float: left\"><img id=\"addFriendModalUserImg\" src=\"" + data.message + "\" class=\"rounded-circle\"></figure><div style=\"margin-left: 50px\" class=\"users-list-body\"><h5>" + friendEmail + "</h5></div></div>");
                }
                $("#addFriendModalHiddenUserId").val(data.id);
            } else {
                addFriendModalShowFriMsgDiv.append("<p>没有找到此用户!</p>");
            }
        },
        error: function (reqText) {
            alert("请求失败[" + reqText.status + "]");
        }
    });
}

/**
 * 发送添加好友请求
 */
function sendAddFriendRequest() {
    var addFriendModalHiddenUserId = $("#addFriendModalHiddenUserId").val();
    var addFriendModalUserImg = null;
    if (document.getElementById("addFriendModalUserImg") != null) {
        addFriendModalUserImg = document.getElementById("addFriendModalUserImg").src;
    }
    var array = new Array();
    array.push(new app.ChatMsg(null, addFriendModalHiddenUserId, $("#message").val(), null, null, null));
    var dataContent = new app.DataContent(app.ADD_FRIEND, array, addFriendModalUserImg);
    wsChat(JSON.stringify(dataContent));


}

/**
 * 在导航栏显示发送来的好友添加请求
 * @param dataContent
 */
function showAddFriendRequestInSidebar(dataContent) {

    console.log("dataContent : " + dataContent.chatMsg);
    var chatMsg = dataContent.chatMsg[0];
    var chatsSidebarBodyId = document.getElementById("chats-sidebar-body-id");
    console.log(" chatsSidebarBodyId : " + chatsSidebarBodyId);
    if (chatsSidebarBodyId == null || chatsSidebarBodyId == undefined ) {
        // 没有打开chat聊天导航栏
        $("#chats-navigation-atag").attr("class","notifiy_badge");
    } else {
        $("#chats-navigation-atag").attr("class","active");
        // 有打开chat聊天导航栏
        // 添加新的子节点
        var newLiNode = document.createElement("li");
        newLiNode.setAttribute("class", "list-group-item");
        newLiNode.setAttribute("data-toggle", "modal");
        newLiNode.setAttribute("data-target", "#addFriendsRequestDialog");
        newLiNode.onclick = function(){
            setAddFriendRequestModalMsgByNetty(dataContent);
        };
        // var friendRequestLiHtml = "<li class=\"list-group-item\" onclick=\"openAddFriendRequestDiglog()\">";
        var friendRequestLiHtml = "";
        friendRequestLiHtml += "<figure class=\"avatar avatar-state-success\">";
        friendRequestLiHtml += "<img src=\"" + dataContent.extand + "\" class=\"rounded-circle\"></figure>";
        friendRequestLiHtml += "<div class=\"users-list-body\"><h5>" + chatMsg.senderId + "</h5>";
        friendRequestLiHtml += "<p>" + chatMsg.msg + "</p>";
        friendRequestLiHtml += "<div class=\"users-list-action\"><div class=\"new-message-count\">1</div></div></div>";
        newLiNode.appendHTML(friendRequestLiHtml);
        var chatsSidebarBodyUlElement = document.getElementById("chats-sidebar-body-ul");
        chatsSidebarBodyUlElement.insertBefore(newLiNode, chatsSidebarBodyUlElement.childNodes[0]);
        // 添加新的子节点
    }

}

/**
 * 实例化添加好友弹窗的信息 - netty 接收的信息
 * @param requestId
 */
function setAddFriendRequestModalMsgByNetty(dataContent) {
    var chatMsg = dataContent.chatMsg[0];
    console.log("!!!!!!!!!!!!!!!!!! chatMsg.senderId : " + chatMsg.senderId);
    console.log("!!!!!!!!!!!!!!!!!! chatMsg.senderId : " + chatMsg.msg);
    // $("#AddFriRequestUserImg").src = dataContent.extand;
    $("#AddFriRequestUserName").text(chatMsg.senderId);
    $("#AddFriRequestMsg").text(chatMsg.msg);
    $("#addFriendRequestDialogHiddenMgsId").val(chatMsg.msgId);
}

/**
 * 实例化添加好友弹窗的信息
 * @param addFriReq
 */
function setAddFriendRequestModalMsg(addFriReq) {
    // $("#AddFriRequestUserImg").src = addFriReq.sendUserImgPath;
    $("#AddFriRequestUserName").text(addFriReq.sendUserName);
    $("#AddFriRequestMsg").text(addFriReq.invitationMsg);
    $("#addFriendRequestDialogHiddenMgsId").val(addFriReq.addFriendRequestId);
}

/**
 * 同意添加好友的请求
 * @constructor
 */
function AceptAddFriendRequest() {
    var array = new Array();
    array.push(new app.ChatMsg(null, null, "1", $("#addFriendRequestDialogHiddenMgsId").val(), null, null));
    var dataContent = new app.DataContent(app.ADD_FRIEND_REPONSE, array, null);
    wsChat(JSON.stringify(dataContent));
}

/**
 * 拒绝添加好友的请求
 * @constructor
 */
function RejectAddFriendRequest() {
    var array = new Array();
    array.push(new app.ChatMsg(null, null,"0", $("#addFriendRequestDialogHiddenMgsId").val(), null, null));
    var dataContent = new app.DataContent(app.ADD_FRIEND_REPONSE, array, null);
    wsChat(JSON.stringify(dataContent));
}

/**
 * JavaScript原生实现appendHtml
 * @param html
 */
HTMLElement.prototype.appendHTML = function(html) {
    var divTemp = document.createElement("div"), nodes = null
        // 文档片段，一次性append，提高性能
        , fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
        fragment.appendChild(nodes[i].cloneNode(true));
    }
    this.appendChild(fragment);
    // 据说下面这样子世界会更清净
    nodes = null;
    fragment = null;
};