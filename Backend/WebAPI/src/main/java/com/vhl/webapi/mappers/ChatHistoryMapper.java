package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.responses.ChatHistoryResDTO;
import com.vhl.webapi.entities.specific.ChatHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ChatQAMapper.class})
public interface ChatHistoryMapper {
    @Mapping(target = "learnerId", source = "learner.id")
    ChatHistoryResDTO toChatHistoryResDTO(ChatHistory chatHistory);

}
