import { createSlice } from "@reduxjs/toolkit";
import {
  getPhysician,
  getRegions,
} from "../../halloAPIs/adminAPIs/dashboardAPIs/getRegionPhysicianAPI";

const initialState = {
  regions: [],
  physicians: [],
};

export const getRegionPhysicianSlice = createSlice({
  name: "Get Region Physician",
  initialState,
  reducers: {
    clearPhysician: (state) => {
      state.physicians = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRegions.fulfilled, (state, action) => {
      if (action.payload) {
        state.regions = action.payload.data;
      }
    });
    builder.addCase(getPhysician.fulfilled, (state, action) => {
      if (action.payload) {
        state.physicians = action.payload.data;
      }
    });
  },
});

export default getRegionPhysicianSlice.reducer;
export const { clearPhysician } = getRegionPhysicianSlice.actions;
