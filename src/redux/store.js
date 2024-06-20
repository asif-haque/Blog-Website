import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./features/authSlice";
import themeSliceReducer from "./features/themeSlice";

// configureStore takes in an object, which has a prop - reducer. This reducer prop
// takes in another object, which contains reducers created by various slices.
// Here the auth named slice (prop) has authSliceReducer.
export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    theme: themeSliceReducer,
  },
});
