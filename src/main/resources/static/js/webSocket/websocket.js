var socket;
function initWs() {
    if(!window.WebSocket){
        window.WebSocket = window.MozWebSocket;
    }
    if(window.WebSocket){

        if(socket!=null&&socket!=undefined&&socket.readyState==WebSocket.OPEN){

        } else {
            socket = new WebSocket("ws://localhost:8000/wsx");

            socket.onmessage = function(event){
                // var ta = document.getElementById('responseText');
                // ta.value += event.data+"\r\n";
                wsOnMessage(event.data);
            };

            socket.onopen = function(event){
                // var ta = document.getElementById('responseText');
                // ta.value = "Netty-WebSocket服务器。。。。。。连接  \r\n";
                console.log("Netty-WebSocket服务器。。。。。。连接")
                wsOnOpen(event);
            };

            socket.onclose = function(event){
                // var ta = document.getElementById('responseText');
                // ta.value = "Netty-WebSocket服务器。。。。。。关闭 \r\n";
                console.log("Netty-WebSocket服务器。。。。。。关闭")
            };

            socket.onerror = function (event) {
                // var ta = document.getElementById('responseText');
                // ta.value = "Netty-WebSocket服务器。。。。。。连接出现异常...  \r\n";
                console.log("Netty-WebSocket服务器。。。。。。连接出现异常... ")
            }

        }
    }else{
        alert("您的浏览器不支持WebSocket协议！");
    }
}

function wsOnMessage(data) {
    console.log(" 收到消息 " + data);
    var dataContent = JSON.parse(data);
    if (dataContent.action == 2) {
        console.log(" 收到聊天消息 " + dataContent.chatMsg[0].msg);
        showNewMsg(dataContent);
    } else if (dataContent.action == 6) {
        // 展示用户和朋友的对话框消息内容
        console.log(" content length : " + dataContent.chatMsg.length);
        $("#chatBodyFriIfOnline").text((dataContent.extand == 1 ? "Online" : "OutLine"));
        showChatBody(dataContent.chatMsg);
    }
}

function wsOnOpen(event) {
    // 拉取连接建立之前的未签收的消息记录
    // 发送心跳包
    setTimeout(function () {
        keepAliveHeartBeat();
    }, 1000);
    setTimeout(function () {
        wsInitUser();
    }, 1000);
}

function keepAliveHeartBeat() {
    // 构建对象
    var dataContent = new app.DataContent(app.KEEPALIVE, null, null);
    // 发送心跳
    wsChat(JSON.stringify(dataContent));

    // 定时执行函数, 其他操作
    setTimeout(function () {
        keepAliveHeartBeat();
    }, 5000);
    // 拉取未读消息
    // 拉取好友信息
}

function wsChat(msg) {
    // 如果的当前的WebSocket是连接的状态,直接发送 否则从新连接
    console.log("socket.readyState : " + socket.readyState);
    console.log(" send msg : " + msg);

    if(socket.readyState==WebSocket.OPEN&&socket!=null&&socket!=undefined){
        // var dataContent = new app.DataContent(app.CHAT, new app.ChatMsg("lyt", null, msg, null), null);
        socket.send(msg);
    }else{
        // 重新连接
        initWs();
        // 延迟一会,从新发送
        setTimeout(1000);
        wsChat(msg);
    }
}

function wsInitUser() {
    // webSocket连接上后发送UserId用以服务器保存channel和用户的关系
    var currentUserId = $("#currentUserId").val();
    var arry = new Array();
    arry.push(new app.ChatMsg(currentUserId, null, null, null, null, null));
    var dataContent = new app.DataContent(app.CONNECT, arry, null);
    wsChat(JSON.stringify(dataContent));
}