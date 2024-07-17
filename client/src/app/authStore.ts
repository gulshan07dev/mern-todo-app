import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "@/types";

export interface AuthState {
  user: IUser | null;
  isLoggedIn: boolean;
  login: (userData: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        login: (userData) => set(() => ({ user: userData, isLoggedIn: true })),
        logout: () => set(() => ({ user: null, isLoggedIn: false })),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
