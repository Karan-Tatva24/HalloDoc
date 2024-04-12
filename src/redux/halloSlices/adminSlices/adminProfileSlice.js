import { createSlice } from "@reduxjs/toolkit";
import { adminProfile } from "../../halloAPIs/adminProfileAPI";

const initialState = {
  profileData: {},
};

export const adminProfileSlice = createSlice({
  name: "Admin Profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(adminProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.profileData = action.payload?.data?.[0];
      }
    });
  },
});

export default adminProfileSlice.reducer;
