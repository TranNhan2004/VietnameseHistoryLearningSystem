package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.AdminReqDTO;
import com.vhl.webapi.dtos.requests.LearnerReqDTO;
import com.vhl.webapi.dtos.responses.AdminResDTO;
import com.vhl.webapi.dtos.responses.LearnerResDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.entities.specific.Learner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BaseUserMapper {
    BaseUserMapper INSTANCE = Mappers.getMapper(BaseUserMapper.class);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "adminLevel", expression = "java(com.vhl.webapi.enums.AdminLevel.valueOf(adminDTO.getAdminLevel()))")
    Admin toAdmin(AdminReqDTO adminDTO);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "rank", expression = "java(com.vhl.webapi.enums.LearnerRank.valueOf(learnerReqDTO.getRank()))")
    Learner toLearner(LearnerReqDTO learnerReqDTO);

    @Mapping(target = "adminLevel", expression = "java(admin.getAdminLevel().name())")
    AdminResDTO toAdminResponseDTO(Admin admin);

    @Mapping(target = "rank", expression = "java(learner.getRank().name())")
    LearnerResDTO toLearnerResponseDTO(Learner learner);
}
