import { createSlice } from "@reduxjs/toolkit";
import { medicalHistory } from "../../halloAPIs/patientAPIs/medicalHistoryAPI";

const initialState = {
  medicalHistoryData: {},
};

export const medicalHistorySlice = createSlice({
  name: "Medical History",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(medicalHistory.fulfilled, (state, action) => {
      if (action.payload) {
        state.medicalHistoryData = action.payload?.data;
      }
    });
  },
});

export default medicalHistorySlice.reducer;
