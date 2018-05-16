package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.DateUtils;

@Controller
@RequestMapping("/rollcreate")
public class RollCreateController {

    @RequestMapping(value="/rollcreate.json",method = RequestMethod.GET)
    public @ResponseBody String getRollId(@RequestParam(value = "ukey") String ukey) {
        return ukey+""+DateUtils.createNow().getTimeInMillis();
    }
 

    @RequestMapping("/create")
    public String getRollPartialPage() {
        return "roll/create";
    }
}
