package com.vhl.webapi.services.interfaces;

import jakarta.mail.MessagingException;

import java.io.IOException;
import java.util.Map;

public interface EmailService {
    void sendHtmlEmail(String to, String subject, String templatePath, Map<String, String> placeholders)
        throws MessagingException, IOException;
}
