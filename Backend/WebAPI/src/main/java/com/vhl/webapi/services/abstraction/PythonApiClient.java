package com.vhl.webapi.services.abstraction;

import org.springframework.web.multipart.MultipartFile;

public interface PythonApiClient {
    String askQuestion(String model, String question, MultipartFile pdf) throws Exception;

    void setConfig(String config);

    String getConfig();
}
