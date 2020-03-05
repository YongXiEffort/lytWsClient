package com.lyt.wsclient.controller;

import com.lyt.wsclient.domain.User;
import com.lyt.wsclient.model.AjaxJsonResult;
import com.lyt.wsclient.service.interfaceP.IFriendsService;
import com.lyt.wsclient.service.interfaceP.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/friendsC")
public class FriendsController {

    @Autowired
    private IFriendsService iFriendsService;
    @Autowired
    private IUserService iUserService;

    @RequestMapping("/getFriendsSidebarBodyPage")
    public String getFriendsSidebarBodyPage(Model model) {
        model.addAttribute("friUserList", iFriendsService.findFriUserAroundUser());
        return "indexComponentP/friendsSidebarBody";
    }

    @RequestMapping("/searchWhichFriendYouWantToAdd")
    @ResponseBody
    public AjaxJsonResult searchWhichFriendYouWantToAdd(@RequestParam(required = true) String friendUserName) {
        AjaxJsonResult ajaxJsonResult = new AjaxJsonResult();
        User user = iUserService.getByUsername(friendUserName);
        if (user == null) {
            ajaxJsonResult.setSuccess(false);
        } else {
            ajaxJsonResult.setSuccess(true);
            ajaxJsonResult.setMessage(user.getImgPath());
            ajaxJsonResult.setId(user.getId());
        }
        return ajaxJsonResult;
    }

}
