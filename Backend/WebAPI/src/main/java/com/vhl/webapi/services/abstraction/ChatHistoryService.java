package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ChatQAReqDTO;
import com.vhl.webapi.dtos.responses.ChatHistoryResDTO;
import com.vhl.webapi.dtos.responses.ChatQAResDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ChatHistoryService {
    ChatQAResDTO createOrUpdateChatHistory(String learnerId, String model, ChatQAReqDTO chatQAReqDTO, MultipartFile pdf) throws Exception;

    ChatHistoryResDTO getChatHistory(String id);

    List<ChatHistoryResDTO> getAllChatHistoriesByLearner(String learnerId);

    void deleteChatHistory(String id);
}
