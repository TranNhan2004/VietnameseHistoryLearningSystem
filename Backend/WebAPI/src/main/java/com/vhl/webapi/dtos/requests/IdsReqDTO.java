package com.vhl.webapi.dtos.requests;

import lombok.Data;

import java.util.List;

@Data
public class IdsReqDTO {
    private List<String> ids;
}
