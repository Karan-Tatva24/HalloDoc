import { createSlice } from "@reduxjs/toolkit";
import { viewNotes } from "../../halloAPIs/adminAPIs/dashboardAPIs/viewNotesAPI";

const initialState = {
  notes: {},
};

export const viewNotesSlice = createSlice({
  name: "View Notes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(viewNotes.fulfilled, (state, action) => {
      if (action.payload) {
        state.notes = action.payload?.data?.[0];
      }
    });
  },
});

export default viewNotesSlice.reducer;
