package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.ChatHistoryErrorCode;
import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import com.vhl.webapi.dtos.requests.ChatQAReqDTO;
import com.vhl.webapi.dtos.responses.ChatHistoryResDTO;
import com.vhl.webapi.dtos.responses.ChatQAResDTO;
import com.vhl.webapi.entities.specific.ChatHistory;
import com.vhl.webapi.entities.specific.ChatQA;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ChatHistoryMapper;
import com.vhl.webapi.mappers.ChatQAMapper;
import com.vhl.webapi.repositories.ChatHistoryRepository;
import com.vhl.webapi.repositories.ChatQARepository;
import com.vhl.webapi.repositories.LearnerRepository;
import com.vhl.webapi.services.abstraction.ChatBotService;
import com.vhl.webapi.services.abstraction.PythonApiClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatBotServiceImpl implements ChatBotService {
    private final ChatHistoryRepository chatHistoryRepository;
    private final ChatQARepository chatQARepository;
    private final LearnerRepository learnerRepository;
    private final ChatHistoryMapper chatHistoryMapper;
    private final ChatQAMapper chatQAMapper;
    private final PythonApiClient pythonApiClient;

    @Override
    public void setConfig(String config) {
        pythonApiClient.setConfig(config);
    }

    @Override
    public String getConfig() {
        return pythonApiClient.getConfig();
    }

    @Override
    @Transactional
    public ChatQAResDTO createOrUpdateChatHistory(
        String learnerId,
        String model,
        ChatQAReqDTO chatQAReqDTO,
        MultipartFile pdf
    ) throws Exception {

        Learner learner = learnerRepository.findById(learnerId)
            .orElseThrow(() -> new NoInstanceFoundException(LearnerErrorCode.LEARNER__NOT_FOUND));

        ChatHistory chatHistorySaved;
        if (chatQAReqDTO.getChatHistoryId() == null || chatQAReqDTO.getChatHistoryId().isBlank()) {
            ChatHistory chatHistory = new ChatHistory();
            chatHistory.setLearner(learner);
            chatHistory.setTitle(chatQAReqDTO.getQuestion());
            chatHistorySaved = chatHistoryRepository.saveAndFlush(chatHistory);

        } else {
            chatHistorySaved = chatHistoryRepository.findById(chatQAReqDTO.getChatHistoryId())
                .orElseThrow(() -> new NoInstanceFoundException(ChatHistoryErrorCode.CHAT_HISTORY__NOT_FOUND));
        }


        ChatQA chatQA = chatQAMapper.toChatQA(chatQAReqDTO);
        chatQA.setChatHistory(chatHistorySaved);

        String answer = pythonApiClient.askQuestion(model, chatQAReqDTO.getQuestion(), pdf);
        System.out.println(answer);

        chatQA.setAnswer(answer);

        ChatQA chatQASaved = chatQARepository.saveAndFlush(chatQA);
        return chatQAMapper.toChatQAResDTO(chatQASaved);
    }

    @Override
    public ChatHistoryResDTO getChatHistory(String id) {
        ChatHistory chatHistory = chatHistoryRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ChatHistoryErrorCode.CHAT_HISTORY__NOT_FOUND));

        return chatHistoryMapper.toChatHistoryResDTO(chatHistory);
    }

    @Override
    public List<ChatHistoryResDTO> getAllChatHistoriesByLearner(String learnerId) {
        List<ChatHistory> chatHistories = chatHistoryRepository.findAllByLearner_Id(learnerId);

        return chatHistories.stream()
            .map(chatHistoryMapper::toChatHistoryResDTO)
            .toList();
    }

    @Override
    public void deleteChatHistory(String id) {
        if (!chatHistoryRepository.existsById(id)) {
            throw new NoInstanceFoundException(ChatHistoryErrorCode.CHAT_HISTORY__NOT_FOUND);
        }

        chatHistoryRepository.deleteById(id);
    }
}
