package com.lyt.wsclient.service.interfaceP;

import javax.servlet.http.HttpSession;

public interface IUserService {

    /**
     * 用户登录
     */
    String login(String username, String password, HttpSession session);

}
