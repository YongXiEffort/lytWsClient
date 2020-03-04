package com.lyt.wsclient.controller;

import com.lyt.wsclient.service.interfaceP.IChatService;
import com.lyt.wsclient.service.interfaceP.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Chat 相关的Controller
 */
@Controller
@RequestMapping("/chatC")
public class ChatsController {

    @Autowired
    private IChatService iChatService;
    @Autowired
    private IUserService iUserService;

    /**
     * 获取Chat导航栏html内容
     * @return
     */
    @RequestMapping(value = "/getChatsSidebarBodyPage", method = RequestMethod.GET)
    public String getChatsSidebarBodyPage(Model model) {
        model.addAttribute("friUserList", iChatService.findFriUserAroundUser());
        return "indexComponentP/chatsSidebarBody";
    }

    /**
     * 获取Chat 聊天对话框html内容
     * @return
     */
    @RequestMapping(value = "/getChatBodyPage", method = RequestMethod.GET)
    public String getChatBodyPage(Model model, @RequestParam(required = true) String friUserId) {
//        model.addAttribute("chatMsgList", iChatService.findChatMsgByReceptUser(friUserId));
        String friUserName = iUserService.getByUserId(friUserId).getUserName();
        System.out.println(" friUserName : " + friUserName);
        model.addAttribute("friUserName", friUserName);
        model.addAttribute("friUserId", friUserId);
        return "indexComponentP/chatBody";
    }

}
