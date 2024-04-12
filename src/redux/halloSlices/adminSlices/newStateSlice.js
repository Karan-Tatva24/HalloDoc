import { createSlice } from "@reduxjs/toolkit";
import { newState } from "../../halloAPIs/newStateAPI";

const initialState = {
  stateData: {},
};

export const newStateSlice = createSlice({
  name: "New State",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(newState.fulfilled, (state, action) => {
      if (action.payload) {
        state.stateData = action.payload?.data?.patients;
      }
    });
  },
});

export default newStateSlice.reducer;
