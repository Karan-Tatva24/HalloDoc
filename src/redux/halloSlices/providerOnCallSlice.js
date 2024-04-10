import { createSlice } from "@reduxjs/toolkit";
import { providerOnCall } from "../halloAPIs/providerOnCallAPI";

const initialState = {
  providerOnCallData: [],
};

export const providerOnCallSlice = createSlice({
  name: "Provider On Call",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(providerOnCall.fulfilled, (state, action) => {
      if (action.payload) {
        state.providerOnCallData = action.payload.data;
      }
    });
  },
});

export default providerOnCallSlice.reducer;
