import { createSlice } from "@reduxjs/toolkit";
import { userAccess } from "../halloAPIs/userAccessAPI";

const initialState = {
  userAccount: [],
};

export const userAccessSlice = createSlice({
  name: "User Access",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userAccess.fulfilled, (state, action) => {
      if (action.payload) {
        state.userAccount = action.payload?.data;
      }
    });
  },
});

export default userAccessSlice.reducer;
