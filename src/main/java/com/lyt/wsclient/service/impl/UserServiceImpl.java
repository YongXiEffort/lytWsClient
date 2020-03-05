package com.lyt.wsclient.service.impl;

import com.lyt.wsclient.dao.UserMapper;
import com.lyt.wsclient.domain.User;
import com.lyt.wsclient.model.UserDetail;
import com.lyt.wsclient.service.interfaceP.IUserService;
import com.lyt.wsclient.util.UserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserMapper userMapper;

    @Override
    public String login(String username, String password, HttpSession session) {

        if (username == null || username.equals("")) {
            return "003";
        }

        try {
            UserDetail userDetail = loadUserByUsername(username);

            if(!password.equals(userDetail.getPassword())){
                return "002";
            }
            Authentication authentication = buildAuthentication(userDetail);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            session.setAttribute("user", userDetail.getUser());
            session.setAttribute("userUtils", new UserUtil());
        } catch (AuthenticationException e) {
            LOGGER.warn("登录异常:{}", e.getMessage());
            return "005";
        }
        return "001";

    }

    public UserDetail loadUserByUsername(String username) {
        User user = getByUsername(username);
        if(user!=null){
            UserDetail userDetail = new UserDetail(user);
            return userDetail;
        }
        throw new UsernameNotFoundException("用户名或密码错误");
    }

    @Override
    public User getByUsername(String username) {
        User user = userMapper.findByName(username);
        if (user != null && user.getId() != null) {
            return user;
        }
        return null;
    }

    @Override
    public User getByUserId(String userId) {
        User user = userMapper.findByUserId(userId);
        if (user != null && user.getId() != null) {
            return user;
        }
        return null;
    }

    /**
     * Builds the authentication.
     *
     * @param user the user
     * @return the authentication
     */
    private Authentication buildAuthentication(final UserDetail user) {
        Authentication authentication = new Authentication() {
            boolean authenticated = true;

            @Override
            public String getName() {
                return user.getUsername();
            }

            @Override
            public void setAuthenticated(boolean authenticated) throws IllegalArgumentException {
                this.authenticated = authenticated;
            }

            @Override
            public boolean isAuthenticated() {
                return authenticated;
            }

            @Override
            public Object getPrincipal() {
                return user;
            }

            @Override
            public Object getDetails() {
                return null;
            }

            @Override
            public Object getCredentials() {
                return user;
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return user.getAuthorities();
            }
        };
        return authentication;
    }

}
