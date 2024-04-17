import { createSlice } from "@reduxjs/toolkit";
import { getEncounterForm } from "../../halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";

const initialState = {
  encounterFormData: {},
};

export const encounterFormSlice = createSlice({
  name: "Encounter Form",
  initialState,
  reducers: {
    clearEncounterForm: (state) => {
      state.encounterFormData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEncounterForm.fulfilled, (state, action) => {
      if (action.payload) {
        state.encounterFormData = action.payload?.data?.[0];
      }
    });
  },
});

export default encounterFormSlice.reducer;
export const { clearEncounterForm } = encounterFormSlice.actions;
