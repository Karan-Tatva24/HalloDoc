import { createSlice } from "@reduxjs/toolkit";
import { viewSendOrder } from "../../halloAPIs/sendOrderAPI";

const initialState = {
  order: [],
};

export const sendOrderSlice = createSlice({
  name: "send order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewSendOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.order = action.payload.data;
      }
    });
  },
});

export default sendOrderSlice.reducer;
