import { createSlice } from "@reduxjs/toolkit";
import { accountAccess } from "../halloAPIs/accountAccessAPI";

const initialState = {
  accessAccount: [],
};

export const accountAccessSlice = createSlice({
  name: "Account Access",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(accountAccess.fulfilled, (state, action) => {
      if (action.payload) {
        state.accessAccount = action.payload?.data;
      }
    });
  },
});

export default accountAccessSlice.reducer;
