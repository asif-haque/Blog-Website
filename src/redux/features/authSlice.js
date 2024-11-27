import { createSlice } from "@reduxjs/toolkit";

// We need 2 states to handle the user data throughout the app.
// One is authentication-status, another is activeUserData (coming from getAccount).
// And 2 actions to set the state

// createSlice takes in an object as parameter, which has 3 props: name, initialState,
// reducers.
export const authSlice = createSlice({
  name: "auth",
  initialState: { loginStatus: false, activeUserData: null },
  // reducers prop takes in an object, which contains the "set-methods" (action) as prop
  // and their definitions. Each method has access to 2 parameters: state and action (method itself).
  reducers: {
    login: (state, action) => {
      state.loginStatus = true;
      state.activeUserData = action.payload; // payload: to get the new value of state var
    },
    logout: (state) => {
      state.loginStatus = false;
      state.activeUserData = null;
    },
  },
});

// slice has two props: actions and reducer, export both of them, the actions in
// destructured way for easier access.
export const { login, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
