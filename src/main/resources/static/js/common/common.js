$(function(){

    // 绑定 Chat 导航栏的搜索框内容变化事件
    $("#chatUserSearchText").bind('input porpertychange',function(){
        console.log(" chat search text : " + $("#chatUserSearchText").val());
    });

    showChatsSidebarBody();

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
            alertInfo("提示", "请求失败[" + reqText.status + "]");
        }
    });

}