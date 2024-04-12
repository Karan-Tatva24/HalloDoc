import { createSlice } from "@reduxjs/toolkit";
import { getDashboardByState } from "../../halloAPIs/providerAPIs/getDashboardByStateAPI";

const initialState = {
  providerStateData: {},
};

export const dashboardByStateSlice = createSlice({
  name: "Dashboard By State",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDashboardByState.fulfilled, (state, action) => {
      if (action.payload) {
        state.providerStateData = action.payload.data;
      }
    });
  },
});

export default dashboardByStateSlice.reducer;
