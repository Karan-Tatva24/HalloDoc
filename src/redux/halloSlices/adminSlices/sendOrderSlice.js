import { createSlice } from "@reduxjs/toolkit";
import { viewSendOrder } from "../../halloAPIs/adminAPIs/partnerAPIs/sendOrderAPI";

const initialState = {
  order: {},
};

export const sendOrderSlice = createSlice({
  name: "send order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(viewSendOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.order = action.payload.data?.[0];
      }
    });
  },
});

export default sendOrderSlice.reducer;
export const { clearOrder } = sendOrderSlice.actions;
