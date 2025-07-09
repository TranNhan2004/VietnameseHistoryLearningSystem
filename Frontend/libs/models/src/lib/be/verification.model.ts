export interface SendOTP {
  email: string;
}

export interface Verification {
  email: string;
  otp: string;
}
