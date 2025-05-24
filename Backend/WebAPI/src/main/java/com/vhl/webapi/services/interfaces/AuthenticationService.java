package com.vhl.webapi.services.interfaces;

import com.vhl.webapi.dtos.requests.BaseUserReqDTO;
import com.vhl.webapi.dtos.requests.LoginReqDTO;
import com.vhl.webapi.dtos.requests.RefreshAccessTokenReqDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import com.vhl.webapi.dtos.responses.LoginResDTO;
import com.vhl.webapi.dtos.responses.NewAccessTokenResDTO;
import com.vhl.webapi.utils.datatypes.Pair;


public interface AuthenticationService {
    BaseUserResDTO signup(BaseUserReqDTO baseUserReqDTO);

    Pair<String, LoginResDTO> login(LoginReqDTO loginReqDTO);

    NewAccessTokenResDTO getNewAccessToken(RefreshAccessTokenReqDTO refreshAccessTokenReqDTO, String refreshToken);

}
