import { create } from "zustand";
import { User } from "@/interfaces/User";
import { Test_User } from "@/DUMMY_DATA";

export type AuthState = {
  isLoggedIn: boolean;
  profile: User | null;
  users: User[];
};

export type AuthActions = {
  onLogout: () => void;
  onLogin: (emailOrUsername: string, password: string) => void;
  onSignup: (user: Omit<User, "id">) => void;
  getByUserId: (userId: string) => User | undefined;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  isLoggedIn: false,
  profile: null,
  users: Test_User,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return create<AuthStore>()((set, get) => ({
    ...initState,

    onLogout: () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isLoggedProfile");
      set(() => ({ isLoggedIn: false, profile: null }));
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

    onSignup: (user: Omit<User, "id">) => {
      set((state) => {
        const newUser: User = {
          id: Math.round(Math.floor(Math.random() * 100)).toString(),
          ...user,
        };
        const newUsers = [...state.users, newUser];
        localStorage.setItem("regUsers", JSON.stringify(newUsers));
        return { users: newUsers };
      });
    },

    getByUserId: (userId: string) => {
      return get().users.find((user) => user.id === userId);
    },
  }));
};
