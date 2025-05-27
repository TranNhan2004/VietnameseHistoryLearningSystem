package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LearnerContestAnswerErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LearnerContestAnswerReqDTO {
    @NotBlank(message = LearnerContestAnswerErrorCode.LEARNER_ID__REQUIRED)
    private String learnerId;

    @NotBlank(message = LearnerContestAnswerErrorCode.CONTEST_ID__REQUIRED)
    private String contestId;

    @NotBlank(message = LearnerContestAnswerErrorCode.ANSWER_OPTION_ID__REQUIRED)
    private String answerOptionId;
}
