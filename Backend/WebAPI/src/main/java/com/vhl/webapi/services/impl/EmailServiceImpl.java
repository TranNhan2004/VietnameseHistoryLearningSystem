package com.vhl.webapi.services.impl;

import com.vhl.webapi.services.abstraction.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private final ResourceLoader resourceLoader;

    @Override
    public void sendHtmlEmail(String to, String subject, String templatePath,
                              Map<String, String> placeholders) throws MessagingException, IOException {

        Resource resource = resourceLoader.getResource("classpath:templates/" + templatePath);
        String htmlContent = new String(Files.readAllBytes(Paths.get(resource.getURI())));

        Document doc = Jsoup.parse(htmlContent);
        Elements strongTags = doc.select("strong");

        for (Element strong : strongTags) {
            String text = strong.text();
            if (text.startsWith("{") && text.endsWith("}")) {
                String key = text.substring(1, text.length() - 1);
                if (placeholders.containsKey(key)) {
                    strong.text(placeholders.get(key));
                }
            }
        }

        String processedHtml = doc.html();

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(processedHtml, true);

        mailSender.send(mimeMessage);
    }
}
