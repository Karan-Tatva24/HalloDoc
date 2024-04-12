import { createSlice } from "@reduxjs/toolkit";
import { getRolesByAccountType } from "../../halloAPIs/createAccessAPI";

const initialState = {
  rolesByAccount: [],
};

export const createAccessSlice = createSlice({
  name: "Create Access",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRolesByAccountType.fulfilled, (state, action) => {
      if (action.payload) {
        state.rolesByAccount = action.payload?.data;
      }
    });
  },
});

export default createAccessSlice.reducer;
