import { createSlice } from "@reduxjs/toolkit";
import { getPatientName } from "../halloAPIs/getPatientNameAPI";

const initialState = {
  patientName: "",
  id: "",
};

export const getPatientNameSlice = createSlice({
  name: "Patient Name",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPatientName.fulfilled, (state, action) => {
      if (action.payload) {
        state.id = action.payload.data[0]?.id;
        state.patientName = action.payload.data[0]?.["Patient Name"];
      }
    });
  },
});

export default getPatientNameSlice.reducer;
