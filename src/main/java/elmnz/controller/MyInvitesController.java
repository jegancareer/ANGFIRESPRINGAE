package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/myinvites")
public class MyInvitesController {


    @RequestMapping("/list")
    public String getRollPartialPage() {
        return "roll/myinvites";
    }
}
