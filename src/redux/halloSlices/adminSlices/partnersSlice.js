import { createSlice } from "@reduxjs/toolkit";
import {
  getVendor,
  viewBusiness,
} from "../../halloAPIs/adminAPIs/partnerAPIs/partnersAPI";

const initialState = {
  vendorData: {},
  business: {},
};

export const partnersSlice = createSlice({
  name: "Partners",
  initialState,
  reducers: {
    clearBusiness: (state) => {
      state.business = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVendor.fulfilled, (state, action) => {
      if (action.payload) {
        state.vendorData = action.payload.data;
      }
    });
    builder.addCase(viewBusiness.fulfilled, (state, action) => {
      if (action.payload) {
        state.business = action.payload.data[0];
      }
    });
  },
});

export const { clearBusiness } = partnersSlice.actions;
export default partnersSlice.reducer;
