import { createSlice } from "@reduxjs/toolkit";
import {
  physicianProfile,
  providerInfo,
} from "../../halloAPIs/adminAPIs/providerAPIs/providerInfoAPI";

const initialState = {
  providerInfoData: [],
  physicianData: {},
};

export const providerInfoSlice = createSlice({
  name: "Provider Information",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(providerInfo.fulfilled, (state, action) => {
      if (action.payload) {
        state.providerInfoData = action.payload?.data;
      }
    });
    builder.addCase(physicianProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.physicianData = action.payload?.data;
      }
    });
  },
});

export default providerInfoSlice.reducer;
