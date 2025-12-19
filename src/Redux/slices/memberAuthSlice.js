import { createSlice } from "@reduxjs/toolkit";

const memberAuthSlice = createSlice({
  name: "memberAuth",
  initialState: {
    member: null,
    isMemberLoggedIn: false,
  },
  reducers: {
    setMemberLogin: (state, action) => {
      state.member = action.payload;
      state.isMemberLoggedIn = true;
    },
    setMemberLogout: (state) => {
      state.member = null;
      state.isMemberLoggedIn = false;
    },
  },
});

export const { setMemberLogin, setMemberLogout } = memberAuthSlice.actions;
export default memberAuthSlice.reducer;
