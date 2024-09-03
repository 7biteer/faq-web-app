export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface Profile {
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SignupUser {
  username: string;
  email: string;
  password: string;
}
