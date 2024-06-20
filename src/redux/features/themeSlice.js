import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark:
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  },
  reducers: {
    toggleTheme: (state, action) => {
      // update immutably to ensure rerender***
      const newState = !state.isDark;
      state.isDark = newState;
      localStorage.setItem("theme", state.isDark ? "dark" : "light");
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
