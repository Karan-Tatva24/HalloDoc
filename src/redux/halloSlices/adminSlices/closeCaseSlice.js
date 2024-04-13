import { createSlice } from "@reduxjs/toolkit";
import { closeCaseView } from "../../halloAPIs/adminAPIs/dashboardAPIs/closeCaseAPI";

const initialState = {
  closeCaseData: {},
};

export const closeCaseSlice = createSlice({
  name: "Close Case",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(closeCaseView.fulfilled, (state, action) => {
      if (action.payload) {
        state.closeCaseData = action.payload?.data?.[0];
      }
    });
  },
});

export default closeCaseSlice.reducer;
