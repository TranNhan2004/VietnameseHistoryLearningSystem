package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.AdminDTO;
import com.vhl.webapi.dtos.requests.LearnerDTO;
import com.vhl.webapi.dtos.responses.AdminResponseDTO;
import com.vhl.webapi.dtos.responses.LearnerResponseDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.entities.specific.Learner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BaseUserMapper {
    BaseUserMapper INSTANCE = Mappers.getMapper(BaseUserMapper.class);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "adminLevel", expression = "java(com.vhl.webapi.enums.AdminLevel.valueOf(adminDTO.getAdminLevel()))")
    Admin toAdmin(AdminDTO adminDTO);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "rank", expression = "java(com.vhl.webapi.enums.LearnerRank.valueOf(learnerDTO.getRank()))")
    Learner toLearner(LearnerDTO learnerDTO);

    @Mapping(target = "adminLevel", expression = "java(admin.getAdminLevel().name())")
    AdminResponseDTO toAdminResponseDTO(Admin admin);

    @Mapping(target = "rank", expression = "java(learner.getRank().name())")
    LearnerResponseDTO toLearnerResponseDTO(Learner learner);
}
