import { createSlice } from "@reduxjs/toolkit";
import { blockHistory } from "../halloAPIs/blockHistoryAPI";
import { patientHistory, patientRecord } from "../halloAPIs/patientRecordsAPI";

const initialState = {
  blockHistoryData: {},
  patientHistoryData: {},
  patientRecordData: {},
};

export const recordsSlice = createSlice({
  name: "All Records",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(blockHistory.fulfilled, (state, action) => {
      if (action.payload) {
        state.blockHistoryData = action.payload.data;
      }
    });
    builder.addCase(patientHistory.fulfilled, (state, action) => {
      if (action.payload) {
        state.patientHistoryData = action.payload.data;
      }
    });
    builder.addCase(patientRecord.fulfilled, (state, action) => {
      if (action.payload) {
        state.patientRecordData = action.payload.data;
      }
    });
  },
});

export default recordsSlice.reducer;
