package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.AdminReqDTO;
import com.vhl.webapi.dtos.requests.LearnerReqDTO;
import com.vhl.webapi.dtos.requests.LoginReqDTO;
import com.vhl.webapi.dtos.requests.RefreshAccessTokenReqDTO;
import com.vhl.webapi.dtos.responses.AdminResDTO;
import com.vhl.webapi.dtos.responses.LearnerResDTO;
import com.vhl.webapi.dtos.responses.NewAccessTokenResDTO;

import java.util.Map;


public interface AuthenticationService {
    AdminResDTO signupForAdmin(AdminReqDTO adminReqDTO);

    LearnerResDTO signupForLearner(LearnerReqDTO learnerReqDTO);

    Map<String, Object> login(LoginReqDTO loginReqDTO);

    NewAccessTokenResDTO getNewAccessToken(RefreshAccessTokenReqDTO refreshAccessTokenReqDTO, String refreshToken);

}
