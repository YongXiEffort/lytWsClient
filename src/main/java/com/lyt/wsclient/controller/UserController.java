package com.lyt.wsclient.controller;

import com.lyt.wsclient.domain.User;
import com.lyt.wsclient.model.AjaxJsonResult;
import com.lyt.wsclient.model.UserDetail;
import com.lyt.wsclient.service.interfaceP.IUserService;
import com.lyt.wsclient.util.UserUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 用户操作Controller
 */
@Controller
@RequestMapping("/userC")
public class UserController {

    private final static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService iUserService;

    /**
     * 用户登录
     * @param username
     * @param password
     * @param request
     * @param model
     * @return
     */
    @RequestMapping(value = "/login")
    public String login(@RequestParam(required = false) String username,
                        @RequestParam(required = false) String password,
                        HttpServletRequest request, Model model) {
        String successUrl = "forward:/indexC/indexPage";
        String failUrl = "login";
        if (StringUtils.isBlank(username)) {
            return failUrl;
        }
        String token = iUserService.login(username, password, request.getSession());
        if (!token.equals("001")) {
            logger.error("-- login Failed ! --");
            return failUrl;
        }
        logger.info("-- Login successfully -- ");
        HttpSession session = request.getSession();
        model.addAttribute("userUtils", new UserUtil());
        return successUrl;
    }

    /**
     * 用户退出系统
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/logoutSystem")
    @ResponseBody
    public AjaxJsonResult logoutSystem(HttpServletRequest request, HttpServletResponse response) {
        AjaxJsonResult ajaxJsonResult = new AjaxJsonResult();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetail memberDetails = null;
        if (auth != null) {
            memberDetails = (UserDetail) auth.getPrincipal();
            System.out.println("memberDetails.getUmsMember().getUsername() : " + memberDetails.getUsername());
        }

        if (auth != null && memberDetails != null) {//登出成功
            new SecurityContextLogoutHandler().logout(request, response, auth);
            ajaxJsonResult.setSuccess(true);
        } else {//登出失败，系统登录超时。请登录后，再次登出。
            ajaxJsonResult.setSuccess(false);
            ajaxJsonResult.setMessage("登出失败!");
        }
        HttpSession session = request.getSession();
        session.invalidate();//清空session
        session = request.getSession();
        return ajaxJsonResult;
    }

}
