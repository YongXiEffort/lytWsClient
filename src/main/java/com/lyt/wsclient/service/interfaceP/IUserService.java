package com.lyt.wsclient.service.interfaceP;

import com.lyt.wsclient.domain.User;

import javax.servlet.http.HttpSession;

public interface IUserService {

    /**
     * 用户登录
     */
    String login(String username, String password, HttpSession session);

    public User getByUserId(String userId);

    public User getByUsername(String username);

}
