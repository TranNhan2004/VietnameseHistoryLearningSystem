package com.vhl.webapi.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @CrossOrigin(origins = "https://admin-vhl.trannhanweb.io.vn")
    @GetMapping("/admin")
    public String callFromAdmin() {
        return "admin";
    }

    @CrossOrigin(origins = "https://learner-vhl.trannhanweb.io.vn")
    @GetMapping("/learner")
    public String callFromLearner() {
        return "learner";
    }

}
