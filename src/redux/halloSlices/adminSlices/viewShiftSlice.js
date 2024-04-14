import { createSlice } from "@reduxjs/toolkit";
import {
  viewShift,
  viewShiftByDate,
} from "../../halloAPIs/adminAPIs/providerAPIs/viewShiftsAPI";

const initialState = {
  viewShiftByDateData: [],
  viewShiftData: {},
};

export const viewShiftSlice = createSlice({
  name: "View Shifts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewShiftByDate.fulfilled, (state, action) => {
      if (action.payload) {
        state.viewShiftByDateData = action.payload.data;
      }
    });
    builder.addCase(viewShift.fulfilled, (state, action) => {
      if (action.payload) {
        state.viewShiftData = action.payload.data[0];
      }
    });
  },
});

export default viewShiftSlice.reducer;
