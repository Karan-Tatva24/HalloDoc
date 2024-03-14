import { createSlice } from "@reduxjs/toolkit";
import { viewCase } from "../halloAPIs/viewReservationAPI";

const initialState = [];

export const viewReservationSlice = createSlice({
  name: "View Case",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewCase.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default viewReservationSlice.reducer;
