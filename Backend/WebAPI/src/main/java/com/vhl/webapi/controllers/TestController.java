package com.vhl.webapi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/admin")
    public String callFromAdmin() {
        return "admin";
    }

    @GetMapping("/learner")
    public String callFromLearner() {
        return "learner";
    }

}
