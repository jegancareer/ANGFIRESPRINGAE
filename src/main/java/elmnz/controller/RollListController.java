package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/rolllist")
public class RollListController {


    @RequestMapping("/list")
    public String getRollPartialPage() {
        return "roll/list";
    }
}
