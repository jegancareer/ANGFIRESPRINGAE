package elmnz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import elmnz.service.CarService;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: xvitcoder
 * Date: 12/21/12
 * Time: 12:23 AM
 */
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
