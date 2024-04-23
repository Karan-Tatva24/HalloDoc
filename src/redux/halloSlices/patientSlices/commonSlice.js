import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestType: "",
};

export const commonSlice = createSlice({
  name: "Common",
  initialState,
  reducers: {
    selectRequestType: (state, action) => {
      state.requestType = action.payload;
    },
  },
});

export const { selectRequestType } = commonSlice.actions;
export default commonSlice.reducer;
