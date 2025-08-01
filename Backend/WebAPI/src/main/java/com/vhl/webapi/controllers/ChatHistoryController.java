package com.vhl.webapi.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vhl.webapi.dtos.requests.ChatQAReqDTO;
import com.vhl.webapi.dtos.responses.ChatHistoryResDTO;
import com.vhl.webapi.dtos.responses.ChatQAResDTO;
import com.vhl.webapi.services.abstraction.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/chat-histories")
@RequiredArgsConstructor
public class ChatHistoryController {
    private final ChatHistoryService chatHistoryService;

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createOrUpdateChatHistory(
        @RequestParam String learnerId,
        @RequestParam String model,
        @RequestPart("metadata") String metadata,
        @RequestPart(value = "pdf", required = false) MultipartFile pdf
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ChatQAReqDTO chatQAReqDTO = objectMapper.readValue(metadata, ChatQAReqDTO.class);

            ChatQAResDTO chatQAResDTO = chatHistoryService.createOrUpdateChatHistory(
                learnerId, model, chatQAReqDTO, pdf
            );
            return ResponseEntity.ok(chatQAResDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("")
    public ResponseEntity<?> getAllChatHistoriesByLearner(@RequestParam String learnerId) {
        List<ChatHistoryResDTO> chatHistoryResDTOS = chatHistoryService.getAllChatHistoriesByLearner(learnerId);
        return ResponseEntity.ok(chatHistoryResDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChatHistoryById(@PathVariable String id) {
        ChatHistoryResDTO chatHistoryResDTO = chatHistoryService.getChatHistory(id);
        return ResponseEntity.ok(chatHistoryResDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChatHistoryById(@PathVariable String id) {
        chatHistoryService.deleteChatHistory(id);
        return ResponseEntity.noContent().build();
    }
}
