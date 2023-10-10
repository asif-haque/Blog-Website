import { createSlice } from "@reduxjs/toolkit";

// we need 2 states to handle the user data throughout the app. One is userData itself (coming from getAccount), another is login-status
// And 2 actions to set the state
export const authSlice = createSlice({
  name: "auth",
  initialState: { status: false, userData: null },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
    },
  },
});

// slice has two prop: actions and reducer, export both of them, the actions in destructured way for easier access
export const { login, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
