package com.vhl.webapi.services.interfaces;

public interface OtpService {
    String generate(int length, boolean onlyNumeric);
}
