import { create } from "zustand";
import { LoginUser, Profile, SignupUser, User } from "@/interfaces/User";
import { Test_User } from "@/DUMMY_DATA";

export type AuthState = {
  isLoggedIn: boolean;
  profile: User | null;
  users: User[];
};

export type AuthActions = {
  onLogout: () => void;
  onLogin: (data: LoginUser) => boolean;
  onSignup: (user: SignupUser) => void;
  getByUserId: (userId: string) => User | undefined;
  updateProfile: (id: string, data: Profile) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "1" ?? false,
  profile: localStorage.getItem("isLoggedProfile")
    ? JSON.parse(localStorage.getItem("isLoggedProfile")!)
    : null,
  users: localStorage.getItem("regUsers")
    ? JSON.parse(localStorage.getItem("regUsers")!)
    : Test_User,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return create<AuthStore>()((set, get) => ({
    ...initState,

    onLogout: () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isLoggedProfile");
      set(() => ({ isLoggedIn: false, profile: null }));
    },

    onLogin: ({ email, password }: LoginUser) => {
      set((state) => {
        const user = state.users.find(
          (u) => u.email === email && u.password === password,
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

      return get().isLoggedIn;
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

    updateProfile: (id: string, data: Profile) => {
      set((state) => {
        const user = state.users.find((user) => user.id === id);
        if (user) {
          const updatedUser: User = {
            id: user.id,
            password: user.password,
            ...data,
          };

          const newUsers = state.users.map((user) =>
            user.id === id ? updatedUser : user,
          );

          localStorage.setItem("regUsers", JSON.stringify(newUsers));
          return { users: newUsers, profile: updatedUser };
        }

        return {};
      });
    },
  }));
};
