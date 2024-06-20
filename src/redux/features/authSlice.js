import { createSlice } from "@reduxjs/toolkit";

// We need 2 states to handle the user data throughout the app.
// One is authentication-status, another is userData (coming from getAccount).
// And 2 actions to set the state

// createSlice takes in an object as parameter, which has 3 props: name, initialState, 
// reducers. 
export const authSlice = createSlice({
  name: "auth",
  initialState: { status: false, userData: null },
  // reducers prop takes in an object, which contains the "set-methods" (action) as prop 
  // and their definitions. Each method has access to 2 parameters: state and action (method itself).
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData; // payload: to get the new value of state var
    },
    logout: (state) => {
      state.status = false;
    },
  },
});

// slice has two props: actions and reducer, export both of them, the actions in 
// destructured way for easier access.
export const { login, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
