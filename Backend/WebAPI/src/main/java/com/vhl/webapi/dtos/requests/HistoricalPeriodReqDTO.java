package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.HistoricalPeriodErrorCode;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HistoricalPeriodReqDTO {
    @NotBlank(message = HistoricalPeriodErrorCode.NAME__REQUIRED)
    private String name;

    @NotNull(message = HistoricalPeriodErrorCode.START_YEAR__REQUIRED)
    private int startYear;

    @NotNull(message = HistoricalPeriodErrorCode.END_YEAR__REQUIRED)
    private int endYear;

    @AssertTrue(message = HistoricalPeriodErrorCode.END_YEAR__INVALID)
    public boolean isEndYearValid() {
        return endYear >= startYear;
    }
}
