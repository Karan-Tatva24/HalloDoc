import { createSlice } from "@reduxjs/toolkit";
import { unApprovedShift } from "../../halloAPIs/schedulingAPI";

const initialState = {
  unApprovedShiftData: {},
};

export const schedulingSlice = createSlice({
  name: "Scheduling",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(unApprovedShift.fulfilled, (state, action) => {
      if (action.payload) {
        state.unApprovedShiftData = action.payload.data;
      }
    });
  },
});

export default schedulingSlice.reducer;
