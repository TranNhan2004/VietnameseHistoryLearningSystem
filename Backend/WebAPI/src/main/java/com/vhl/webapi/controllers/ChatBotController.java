package com.vhl.webapi.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.vhl.webapi.dtos.requests.ChatBotConfigReqDTO;
import com.vhl.webapi.dtos.requests.ChatQAReqDTO;
import com.vhl.webapi.dtos.responses.ChatBotConfigResDTO;
import com.vhl.webapi.dtos.responses.ChatHistoryResDTO;
import com.vhl.webapi.dtos.responses.ChatQAResDTO;
import com.vhl.webapi.services.abstraction.ChatBotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatBotController {
    private final ChatBotService chatBotService;
    private final ObjectMapper objectMapper;

    @PreAuthorize("@roleChecker.hasFullRole('ADMIN_SUPER_ADVANCED')")
    @PutMapping("/config")
    public ResponseEntity<?> setConfig(@Valid @RequestBody ChatBotConfigReqDTO chatBotConfigReqDTO) {
        try {
            ObjectMapper snakeMapper = objectMapper.copy();
            snakeMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
            String config = snakeMapper.writeValueAsString(chatBotConfigReqDTO);
            chatBotService.setConfig(config);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("@roleChecker.hasFullRole('ADMIN_SUPER_ADVANCED')")
    @GetMapping("/config")
    public ResponseEntity<?> getConfig() {
        try {
            String config = chatBotService.getConfig();
            ObjectMapper snakeMapper = objectMapper.copy();
            snakeMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);

            ChatBotConfigResDTO chatBotConfigResDTO = snakeMapper.readValue(config, ChatBotConfigResDTO.class);
            return ResponseEntity.ok(chatBotConfigResDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/histories", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createOrUpdateChatHistory(
        @RequestParam String learnerId,
        @RequestParam String model,
        @RequestPart("metadata") String metadata,
        @RequestPart(value = "pdf", required = false) MultipartFile pdf
    ) {
        try {
            ChatQAReqDTO chatQAReqDTO = objectMapper.readValue(metadata, ChatQAReqDTO.class);

            ChatQAResDTO chatQAResDTO = chatBotService.createOrUpdateChatHistory(learnerId, model, chatQAReqDTO, pdf);
            return ResponseEntity.ok(chatQAResDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/histories")
    public ResponseEntity<?> getAllChatHistoriesByLearner(@RequestParam String learnerId) {
        List<ChatHistoryResDTO> chatHistoryResDTOS = chatBotService.getAllChatHistoriesByLearner(learnerId);
        return ResponseEntity.ok(chatHistoryResDTOS);
    }

    @GetMapping("/histories/{id}")
    public ResponseEntity<?> getChatHistoryById(@PathVariable String id) {
        ChatHistoryResDTO chatHistoryResDTO = chatBotService.getChatHistory(id);
        return ResponseEntity.ok(chatHistoryResDTO);
    }

    @DeleteMapping("/histories/{id}")
    public ResponseEntity<?> deleteChatHistoryById(@PathVariable String id) {
        chatBotService.deleteChatHistory(id);
        return ResponseEntity.noContent().build();
    }
}
