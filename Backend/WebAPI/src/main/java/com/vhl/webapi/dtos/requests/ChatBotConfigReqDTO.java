package com.vhl.webapi.dtos.requests;

import lombok.Data;

@Data
public class ChatBotConfigReqDTO {
    private Integer icrTopK;
    private Integer ocrTopK;
    private Integer maxPdfWords;
    private Double fcAlpha;
    private Integer fcTopK;
    private Double fcMinThreshold;
    private Integer agMaxTokens;
    private Double agTemperature;
    private Double agTopP;
    private Double agRepeatPenalty;
}

