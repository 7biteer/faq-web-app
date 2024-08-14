import { createStore, create } from "zustand";
import { User } from "../interfaces/User";

export type AuthState = {
  isLoggedIn: boolean;
  profile: User | null;
  users: User[];
};

export type AuthActions = {
  onLogout: () => void;
  onLogin: (emailOrUsername: string, password: string) => void;
  onSignup: (user: User) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  isLoggedIn: false,
  profile: null,
  users: [],
};

export const useAuthStore = create<AuthStore>()((set) => ({
  ...defaultInitState,

  onLogout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isLoggedProfile");
    set((state) => ({ isLoggedIn: false, profile: null }));
  },

  onLogin: (emailOrUsername: string, password: string) => {
    set((state) => {
      const user = state.users.find(
        (u) =>
          (u.username === emailOrUsername || u.email === emailOrUsername) &&
          u.password === password
      );
      if (user) {
        localStorage.setItem("isLoggedIn", "1");
        localStorage.setItem("isLoggedProfile", JSON.stringify(user));
        return {
          isLoggedIn: true,
          profile: user,
        };
      } else {
        console.error("Login failed: Invalid credentials");
        return {};
      }
    });
  },

  onSignup: (user: User) => {
    set((state) => {
      const newUsers = [...state.users, user];
      localStorage.setItem("regUsers", JSON.stringify(newUsers));
      return { users: newUsers };
    });
  },
}));
