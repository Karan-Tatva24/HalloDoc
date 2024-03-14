import { createSlice } from "@reduxjs/toolkit";
import { dashboardCount } from "../halloAPIs/dashboardCountAPI";

const initialState = {
  deshboardCount: [],
};

export const getDashboarsCountSlice = createSlice({
  name: "Dashboard Count",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dashboardCount.fulfilled, (state, action) => {
      if (action.payload) {
        state.deshboardCount = action.payload;
      }
    });
  },
});

export default getDashboarsCountSlice.reducer;
