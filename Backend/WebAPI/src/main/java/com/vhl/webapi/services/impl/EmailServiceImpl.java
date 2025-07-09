package com.vhl.webapi.services.impl;

import com.vhl.webapi.services.abstraction.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private final ResourceLoader resourceLoader;

    private final Map<String, String> templateCache = new ConcurrentHashMap<>();

    private String loadTemplateContent(String templatePath) throws IOException {
        if (templateCache.containsKey(templatePath)) {
            return templateCache.get(templatePath);
        }


        Resource resource = resourceLoader.getResource("classpath:templates/" + templatePath);


        String content;
        try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            content = reader.lines().collect(Collectors.joining("\n"));
        }

        templateCache.put(templatePath, content);
        return content;
    }

    private String renderTemplate(String templateContent, Map<String, String> placeholders) {
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            templateContent = templateContent.replace("{" + entry.getKey() + "}", entry.getValue());
        }
        return templateContent;
    }

    @Override
    public void sendHtmlEmail(String to, String subject, String templatePath,
                              Map<String, String> placeholders) throws MessagingException, IOException {

        String rawTemplate = loadTemplateContent(templatePath);

        String processedHtml = renderTemplate(rawTemplate, placeholders);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(processedHtml, true);

        mailSender.send(mimeMessage);
    }
}
