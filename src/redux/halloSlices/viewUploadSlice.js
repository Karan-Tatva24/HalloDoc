import { createSlice } from "@reduxjs/toolkit";
import { viewUpload } from "../halloAPIs/viewUploadAPI";

const initialState = {
  viewUpload: [],
};

export const viewUploadSlice = createSlice({
  name: "View Upload",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewUpload.fulfilled, (state, action) => {
      if (action.payload) {
        state.viewUpload = action.payload?.data;
      }
    });
  },
});

export default viewUploadSlice.reducer;
