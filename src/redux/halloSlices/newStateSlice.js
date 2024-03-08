import { createSlice } from "@reduxjs/toolkit";
import { newState } from "../halloAPIs/newStateAPI";

const initialState = [];

export const newStateSlice = createSlice({
  name: "New State",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(newState.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default newStateSlice.reducer;
