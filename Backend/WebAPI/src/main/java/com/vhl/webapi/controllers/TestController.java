package com.vhl.webapi.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @GetMapping("/admin")
    public String callFromAdmin() {
        return "admin";
    }

    @PreAuthorize("@roleChecker.hasFullRole('LEANER')")
    @GetMapping("/learner")
    public String callFromLearner() {
        return "learner";
    }

}
