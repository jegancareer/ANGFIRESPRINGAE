package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/rollinvite")
public class RollInviteController {
	 @RequestMapping("/invite")
	    public String getRollPartialPage() {
	        return "roll/invite";
	    }
}
