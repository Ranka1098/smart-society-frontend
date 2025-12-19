import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../slices/adminAuthSlice";
import memberAuthReducer from "../slices/memberAuthSlice";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    memberAuth: memberAuthReducer,
  },
});

export default store;
