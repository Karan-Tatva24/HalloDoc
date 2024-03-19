import { createSlice } from "@reduxjs/toolkit";
import { getPatientName } from "../halloAPIs/getPatientNameAPI";

const initialState = {
  patientFirstName: "",
  patientLastName: "",
  confirmationNumber: "",
  id: "",
};

export const getPatientNameSlice = createSlice({
  name: "Patient Name",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPatientName.fulfilled, (state, action) => {
      if (action.payload) {
        state.id = action.payload.data[0]?.id;
        state.patientFirstName = action.payload.data[0]?.["patientFirstName"];
        state.patientLastName = action.payload.data[0]?.["patientLastName"];
        state.confirmationNumber =
          action.payload.data[0]?.["confirmationNumber"];
      }
    });
  },
});

export default getPatientNameSlice.reducer;
