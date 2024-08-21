export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  emailOrUsername: string;
  password: string;
}

export interface SignupUser {
  username: string;
  email: string;
  password: string;
}
