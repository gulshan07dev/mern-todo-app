import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ThemeState {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (theme) =>
          set(() => ({
            theme: theme,
          })),
      }),
      { name: "themeStore" }
    )
  )
);

export default useThemeStore;
