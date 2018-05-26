package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/myrolls")
public class MyRollsController {


    @RequestMapping("/list")
    public String getRollPartialPage() {
        return "roll/myrolls";
    }
}
