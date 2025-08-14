package com.vhl.webapi.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vhl.webapi.services.abstraction.PythonApiClient;
import com.vhl.webapi.services.abstraction.SSRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.Duration;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PythonApiClientImpl implements PythonApiClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final SSRedisService ssRedisService;

    @Value("${spring.data.redis.ai-key}")
    private String redisAIKey;

    @Value("${ai-api-url}")
    private String aiApiUrl;

    @Override
    public String askQuestion(String model, String question, MultipartFile pdf) throws Exception {
        if (pdf != null && !pdf.isEmpty()) {
            return askQuestionWithPdf(model, question, pdf);
        } else {
            System.out.println(model);
            System.out.println(question);
            return askQuestionTextOnly(model, question);
        }
    }

    @Override
    public void setConfig(String config) {
        System.out.println(config);

        ssRedisService.set(redisAIKey, config, Duration.ofDays(365 * 1000));

        String url = aiApiUrl + "config";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to set config: " + response.getStatusCode() + " - " + response.getBody());
        }
    }

    @Override
    public String getConfig() {
        String url = aiApiUrl + "config";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ssRedisService.get(redisAIKey).orElse(null);
    }

    private String askQuestionWithPdf(String model, String question, MultipartFile pdf) throws Exception {
        String url = aiApiUrl + "generate-with-pdf";

        Map<String, Object> metadata = Map.of("question", question, "model", model);
        String metadataJson = objectMapper.writeValueAsString(metadata);

        File temp = File.createTempFile("upload-", ".pdf");
        pdf.transferTo(temp);
        FileSystemResource pdfFile = new FileSystemResource(temp);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("metadata", metadataJson);
        body.add("pdf", pdfFile);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        temp.delete();

        JsonNode node = objectMapper.readTree(response.getBody());
        return node.get("answer").asText();
    }

    private String askQuestionTextOnly(String model, String question) throws Exception {
        String url = aiApiUrl + "generate";

        Map<String, Object> payload = Map.of("question", question, "model", model);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(objectMapper.writeValueAsString(payload), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        JsonNode node = objectMapper.readTree(response.getBody());
        return node.get("answer").asText();
    }
}


