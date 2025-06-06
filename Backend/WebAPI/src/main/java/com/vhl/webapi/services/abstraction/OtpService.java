package com.vhl.webapi.services.abstraction;

public interface OtpService {
    String generate(int length, boolean onlyNumeric);
}
