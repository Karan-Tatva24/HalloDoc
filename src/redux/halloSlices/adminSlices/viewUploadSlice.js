import { createSlice } from "@reduxjs/toolkit";
import { viewUpload } from "../../halloAPIs/adminAPIs/dashboardAPIs/viewUploadAPI";

const initialState = {
  viewUploadData: [],
};

export const viewUploadSlice = createSlice({
  name: "View Upload",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewUpload.fulfilled, (state, action) => {
      if (action.payload) {
        state.viewUploadData = action.payload?.data;
      }
    });
  },
});

export default viewUploadSlice.reducer;
