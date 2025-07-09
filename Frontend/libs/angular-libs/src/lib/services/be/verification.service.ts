import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { SendOTP, Verification } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  sendOTPForVerifyAccount(data: SendOTP) {
    return this.httpClient.post(
      `${this.webApiUrl}verify/account/send-otp`,
      data
    );
  }

  verifyAccount(data: Verification) {
    return this.httpClient.post(`${this.webApiUrl}verify/account`, data);
  }

  sendOTPForResetPassword(data: SendOTP) {
    return this.httpClient.post(
      `${this.webApiUrl}verify/reset-password/send-otp`,
      data
    );
  }

  verifyResetPassword(data: Verification) {
    return this.httpClient.post(`${this.webApiUrl}verify/reset-password`, data);
  }
}
