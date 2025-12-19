import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    admin: null,
    isAdminLoggedIn: false,
  },
  reducers: {
    setAdminLogin: (state, action) => {
      state.admin = action.payload;
      state.isAdminLoggedIn = true;
    },
    setAdminLogout: (state) => {
      state.admin = null;
      state.isAdminLoggedIn = false;
    },
  },
});

export const { setAdminLogin, setAdminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
