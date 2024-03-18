import { createSlice } from "@reduxjs/toolkit";
import { dashboardCount } from "../halloAPIs/dashboardCountAPI";

const initialState = {
  dashboardCount: [],
};

export const getDashboardCountSlice = createSlice({
  name: "Dashboard Count",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dashboardCount.fulfilled, (state, action) => {
      if (action.payload) {
        state.dashboardCount = action.payload.data;
      }
    });
  },
});

export default getDashboardCountSlice.reducer;
