package com.lyt.wsclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/chatC")
public class ChatsController {

    @RequestMapping(value = "/getChatsSidebarBodyPage", method = RequestMethod.GET)
    public String getChatsSidebarBodyPage() {
        return "indexComponentP/chatsSidebarBody";
    }

}
