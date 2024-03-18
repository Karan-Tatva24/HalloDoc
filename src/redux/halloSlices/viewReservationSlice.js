import { createSlice } from "@reduxjs/toolkit";
import { viewCase } from "../halloAPIs/viewReservationAPI";

const initialState = {
  viewCase: {},
};

export const viewReservationSlice = createSlice({
  name: "View Case",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewCase.fulfilled, (state, action) => {
      if (action.payload) {
        state.viewCase = action.payload?.data?.[0];
      }
    });
  },
});

export default viewReservationSlice.reducer;
