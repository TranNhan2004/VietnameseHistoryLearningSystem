package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.BaseUserReqDTO;
import com.vhl.webapi.dtos.requests.LoginReqDTO;
import com.vhl.webapi.dtos.requests.RefreshAccessTokenReqDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import com.vhl.webapi.dtos.responses.NewAccessTokenResDTO;

import java.util.Map;


public interface AuthenticationService {
    BaseUserResDTO signup(BaseUserReqDTO baseUserReqDTO);

    Map<String, Object> login(LoginReqDTO loginReqDTO);

    NewAccessTokenResDTO getNewAccessToken(RefreshAccessTokenReqDTO refreshAccessTokenReqDTO, String refreshToken);

}
