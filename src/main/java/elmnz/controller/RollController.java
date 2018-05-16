package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/roll")
public class RollController {

    @RequestMapping("/roll.json")
    public @ResponseBody String getRollList() {
        return "tesyyt";
    }
 

    @RequestMapping("/layout")
    public String getRollPartialPage() {
        return "roll/layout";
    }
}
