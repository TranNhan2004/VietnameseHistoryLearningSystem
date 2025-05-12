export type LoginRequestType = {
  emailOrUserName: string;
  password: string;
};

export type LoginResponseType = {
  id: string;
  email: string;
  userName: string;
  accessToken: string;
};
