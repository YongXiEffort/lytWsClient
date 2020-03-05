package com.lyt.wsclient.service.impl;

import com.lyt.wsclient.dao.UserRelationMapper;
import com.lyt.wsclient.model.chat.FriUserListModel;
import com.lyt.wsclient.service.interfaceP.IFriendsService;
import com.lyt.wsclient.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendsServiceImpl implements IFriendsService {

    @Autowired
    private UserRelationMapper userRelationMapper;

    @Override
    public List<FriUserListModel> findFriUserAroundUser() {
        List<FriUserListModel> friUserListModelList = userRelationMapper.findFirUserAroundUserOrderByUserName(UserUtil.getCurrUser().getId());
        return (friUserListModelList != null && friUserListModelList.size() > 0) ? friUserListModelList : null;
    }
}
