package com.lyt.wsclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/friendsC")
public class FriendsController {

    @RequestMapping("/getFriendsSidebarBodyPage")
    public String getFriendsSidebarBodyPage(Model model) {

        

        return "indexComponentP/friendsSidebarBody";
    }

}
