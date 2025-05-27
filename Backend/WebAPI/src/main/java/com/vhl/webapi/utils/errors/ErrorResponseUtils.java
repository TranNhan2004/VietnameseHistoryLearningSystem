package com.vhl.webapi.utils.errors;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class ErrorResponseUtils {
    public static Map<String, Object> createObject(HttpStatus status, String error, String message) {
        Map<String, Object> errors = new HashMap<>();
        errors.put("timestamp", Instant.now().toString());
        errors.put("status", status.value());
        errors.put("error", error);
        errors.put("message", message);
        return errors;
    }

    public static void writeObjectToResponse(HttpServletResponse response, HttpStatus status,
                                             String error, String message) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(status.value());
        Map<String, Object> errorObject = createObject(status, error, message);
        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(errorObject));
    }

}
