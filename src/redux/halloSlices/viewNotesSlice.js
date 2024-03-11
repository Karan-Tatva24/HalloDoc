import { createSlice } from "@reduxjs/toolkit";
import { viewNotes } from "../halloAPIs/viewNotesAPI";

const initialState = [];

export const viewNotesSlice = createSlice({
  name: "View Notes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewNotes.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        return { ...state, data };
      }
    });
  },
});

export default viewNotesSlice.reducer;
