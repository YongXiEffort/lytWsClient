package com.lyt.wsclient.service.interfaceP;

import com.lyt.wsclient.domain.ChatSingle;
import com.lyt.wsclient.domain.User;
import com.lyt.wsclient.model.chat.AddFriendModel;
import com.lyt.wsclient.model.chat.FriUserListModel;

import java.util.List;

public interface IChatService {

    /**
     * 查找当前用户的朋友用户
     * @return
     */
    public List<FriUserListModel> findFriUserAroundUser();

    /**
     * 查找当前用户和指定朋友的聊天消息
     * @param friUserId
     * @return
     */
    public List<ChatSingle> findChatMsgByReceptUser(String friUserId);

    /**
     * 根据当前用户的ID查找发来的添加好友请求
     * @return
     */
    public List<AddFriendModel> findAddFriendRequestByCurrentUserId();

}
