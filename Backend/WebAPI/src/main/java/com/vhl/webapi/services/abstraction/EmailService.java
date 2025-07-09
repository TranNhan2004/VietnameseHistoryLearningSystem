package com.vhl.webapi.services.abstraction;

import jakarta.mail.MessagingException;

import java.io.IOException;
import java.util.Map;

public interface EmailService {
    void sendHtmlEmail(String to, String subject, String templateName,
                       Map<String, String> placeholders) throws MessagingException, IOException;
}
