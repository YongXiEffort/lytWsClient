package com.lyt.wsclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/indexC")
@Controller
public class IndexController {

    @RequestMapping("/loginPage")
    public String getLoginPage() {
        return "login";
    }

    @RequestMapping("/indexPage")
    public String getIndexPage() {
        return "index";
    }

    @RequestMapping("/TestWebSocketPage")
    public String getTestWebSocketPage() {
        return "socket";
    }



}
