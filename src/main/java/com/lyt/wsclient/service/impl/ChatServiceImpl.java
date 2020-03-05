package com.lyt.wsclient.service.impl;

import com.lyt.wsclient.dao.AddFriendRequestMapper;
import com.lyt.wsclient.dao.ChatSingleMapper;
import com.lyt.wsclient.dao.UserMapper;
import com.lyt.wsclient.domain.ChatSingle;
import com.lyt.wsclient.domain.User;
import com.lyt.wsclient.model.chat.AddFriendModel;
import com.lyt.wsclient.model.chat.FriUserListModel;
import com.lyt.wsclient.service.interfaceP.IChatService;
import com.lyt.wsclient.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements IChatService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ChatSingleMapper chatSingleMapper;
    @Autowired
    private AddFriendRequestMapper addFriendRequestMapper;

    @Override
    public List<FriUserListModel> findFriUserAroundUser() {
        List<FriUserListModel> userList = userMapper.findFirUserAroundUser(UserUtil.getCurrUser().getId());
        return (userList != null && userList.size() > 0) ? userList : null;
    }

    @Override
    public List<ChatSingle> findChatMsgByReceptUser(String friUserId) {
        List<ChatSingle> chatSingleList = chatSingleMapper.findChatMsgByReceptUser(UserUtil.getCurrUser().getId(), friUserId);
        return (chatSingleList != null && chatSingleList.size() > 0) ? chatSingleList : null;
    }

    @Override
    public List<AddFriendModel> findAddFriendRequestByCurrentUserId() {
        List<AddFriendModel> addFriendModelList = addFriendRequestMapper.findAddFriendRequestByCurrentUserId(UserUtil.getCurrUser().getId());
        return (addFriendModelList != null && addFriendModelList.size() > 0) ? addFriendModelList : null;
    }

}
