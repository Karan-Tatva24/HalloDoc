import { createSlice } from "@reduxjs/toolkit";
import {
  getBusiness,
  getProfession,
} from "../halloAPIs/getProfessionsBusinessAPI";

const initialState = {
  professions: [],
  businesses: [],
};

export const getProfessionBusinessSlice = createSlice({
  name: "Get Region Physician",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProfession.fulfilled, (state, action) => {
      if (action.payload) {
        state.professions = action.payload.data;
      }
    });
    builder.addCase(getBusiness.fulfilled, (state, action) => {
      if (action.payload) {
        state.businesses = action.payload.data;
      }
    });
  },
});

export default getProfessionBusinessSlice.reducer;
