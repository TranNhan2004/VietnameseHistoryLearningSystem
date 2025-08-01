package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.ChatQAReqDTO;
import com.vhl.webapi.dtos.responses.ChatQAResDTO;
import com.vhl.webapi.entities.specific.ChatQA;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChatQAMapper {
    @Mapping(target = "chatHistory", ignore = true)
    ChatQA toChatQA(ChatQAReqDTO chatQAReqDTO);

    @Mapping(target = "chatHistoryId", source = "chatHistory.id")
    ChatQAResDTO toChatQAResDTO(ChatQA chatQA);
}
