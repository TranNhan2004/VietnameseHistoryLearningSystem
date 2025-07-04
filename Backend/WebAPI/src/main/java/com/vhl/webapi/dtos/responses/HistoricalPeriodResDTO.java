package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class HistoricalPeriodResDTO {
    private String id;
    private String name;
    private int startYear;
    private int endYear;
}
