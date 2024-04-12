import { createSlice } from "@reduxjs/toolkit";
import { getSendAgreement } from "../../halloAPIs/sendAgreementAPI";

const initialState = {
  details: {},
};

export const sendAgreementSlice = createSlice({
  name: "Send Agreement",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSendAgreement.fulfilled, (state, action) => {
      if (action.payload) {
        state.details = action.payload?.data?.[0];
      }
    });
  },
});

export default sendAgreementSlice.reducer;
