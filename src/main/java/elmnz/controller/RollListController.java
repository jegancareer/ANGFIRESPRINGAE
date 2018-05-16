package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.DateUtils;

@Controller
@RequestMapping("/rolllist")
public class RollListController {


    @RequestMapping("/list")
    public String getRollPartialPage() {
        return "roll/list";
    }
}
