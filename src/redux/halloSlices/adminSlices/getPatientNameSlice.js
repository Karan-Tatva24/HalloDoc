import { createSlice } from "@reduxjs/toolkit";
import { getPatientName } from "../../halloAPIs/adminAPIs/dashboardAPIs/getPatientNameAPI";

const initialState = {
  patientFirstName: "",
  patientLastName: "",
  confirmationNumber: "",
  id: "",
  requestType: "",
  patientEmail: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  dob: "",
  patientPhoneNumber: "",
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
        state.street = action.payload.data[0]?.street;
        state.city = action.payload.data[0]?.city;
        state.state = action.payload.data[0]?.state;
        state.zipCode = action.payload.data[0]?.zipCode;
        state.dob = action.payload.data[0]?.dob;
        state.patientPhoneNumber = action.payload.data[0]?.patientPhoneNumber;
      }
    });
  },
});

export default getPatientNameSlice.reducer;
