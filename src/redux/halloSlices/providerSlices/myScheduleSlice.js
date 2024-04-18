import { createSlice } from "@reduxjs/toolkit";
import { mySchedule } from "../../halloAPIs/providerAPIs/scheduleAPIs/myScheduleAPI";

const initialState = {
  myScheduleData: [],
};

export const myScheduleSlice = createSlice({
  name: "Provider Schedule",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(mySchedule.fulfilled, (state, action) => {
      if (action.payload) {
        state.myScheduleData = action.payload?.data;
      }
    });
  },
});

export default myScheduleSlice.reducer;
