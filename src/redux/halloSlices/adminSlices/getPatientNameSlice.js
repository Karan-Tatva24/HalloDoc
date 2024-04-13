import { createSlice } from "@reduxjs/toolkit";
import { getPatientName } from "../../halloAPIs/adminAPIs/dashboardAPIs/getPatientNameAPI";

const initialState = {
  patientFirstName: "",
  patientLastName: "",
  confirmationNumber: "",
  id: "",
  requestType: "",
  patientEmail: "",
};

export const getPatientNameSlice = createSlice({
  name: "Patient Name",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPatientName.fulfilled, (state, action) => {
      if (action.payload) {
        state.id = action.payload.data[0]?.id;
        state.patientFirstName = action.payload.data[0]?.patientFirstName;
        state.patientLastName = action.payload.data[0]?.patientLastName;
        state.confirmationNumber = action.payload.data[0]?.confirmationNumber;
        state.requestType = action.payload.data[0]?.requestType;
        state.patientEmail = action.payload.data[0]?.patientEmail;
      }
    });
  },
});

export default getPatientNameSlice.reducer;
