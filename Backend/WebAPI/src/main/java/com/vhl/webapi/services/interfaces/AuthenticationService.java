package com.vhl.webapi.services.interfaces;

import com.vhl.webapi.dtos.requests.BaseUserDTO;
import com.vhl.webapi.dtos.requests.LoginDTO;
import com.vhl.webapi.dtos.responses.BaseUserResponseDTO;
import com.vhl.webapi.dtos.responses.LoginResponseDTO;
import com.vhl.webapi.utils.Pair;

public interface AuthenticationService {
    BaseUserResponseDTO signup(BaseUserDTO baseUserDTO);

    Pair<String, LoginResponseDTO> login(LoginDTO loginDTO);

    LoginResponseDTO getNewAccessToken(String refreshToken, String baseUserId);
}
