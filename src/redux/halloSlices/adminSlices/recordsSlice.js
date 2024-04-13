import { createSlice } from "@reduxjs/toolkit";
import { blockHistory } from "../../halloAPIs/adminAPIs/recordsAPIs/blockHistoryAPI";
import {
  patientHistory,
  patientRecord,
} from "../../halloAPIs/adminAPIs/recordsAPIs/patientRecordsAPI";
import { searchRecord } from "../../halloAPIs/adminAPIs/recordsAPIs/searchRecordsAPI";
import {
  emailLog,
  smsLog,
} from "../../halloAPIs/adminAPIs/recordsAPIs/emailAndsmsLogAPI";

const initialState = {
  blockHistoryData: {},
  patientHistoryData: {},
  patientRecordData: {},
  searchRecordData: {},
  emailLogData: {},
  smsLogData: {},
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
    builder.addCase(searchRecord.fulfilled, (state, action) => {
      if (action.payload) {
        state.searchRecordData = action.payload.data;
      }
    });
    builder.addCase(emailLog.fulfilled, (state, action) => {
      if (action.payload) {
        state.emailLogData = action.payload.data;
      }
    });
    builder.addCase(smsLog.fulfilled, (state, action) => {
      if (action.payload) {
        state.smsLogData = action.payload.data;
      }
    });
  },
});

export default recordsSlice.reducer;
