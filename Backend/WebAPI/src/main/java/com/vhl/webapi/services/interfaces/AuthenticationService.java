package com.vhl.webapi.services.interfaces;

import com.vhl.webapi.dtos.requests.BaseUserDTO;
import com.vhl.webapi.dtos.requests.LoginDTO;
import com.vhl.webapi.dtos.requests.LogoutDTO;
import com.vhl.webapi.dtos.requests.RefreshAccessTokenDTO;
import com.vhl.webapi.dtos.responses.BaseUserResponseDTO;
import com.vhl.webapi.dtos.responses.LoginResponseDTO;

public interface AuthenticationService {
    BaseUserResponseDTO signup(BaseUserDTO baseUserDTO);

    LoginResponseDTO login(LoginDTO loginDTO);

    LoginResponseDTO getNewAccessToken(RefreshAccessTokenDTO refreshAccessTokenDTO);

    void logout(LogoutDTO logoutDTO);
}
