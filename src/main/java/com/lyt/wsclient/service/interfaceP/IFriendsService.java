package com.lyt.wsclient.service.interfaceP;

import com.lyt.wsclient.model.chat.FriUserListModel;

import java.util.List;

public interface IFriendsService {

    /**
     * 查找当前用户的朋友用户
     * @return
     */
    public List<FriUserListModel> findFriUserAroundUser();

}
