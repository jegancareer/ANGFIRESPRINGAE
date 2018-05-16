package elmnz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @RequestMapping("/auth.json")
    public @ResponseBody String getRollList() {
        return "tesyyt";
    }
 
    @RequestMapping("/login")
    public String getAuthPartialPage() {
        return "auth/login";
    }
}
