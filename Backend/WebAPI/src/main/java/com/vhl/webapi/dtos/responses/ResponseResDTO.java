package com.vhl.webapi.dtos.responses;

import com.vhl.webapi.entities.specific.Comment;
import lombok.Data;

@Data
public class ResponseResDTO {
    private Comment toComment;
}
