import { createSlice } from "@reduxjs/toolkit";
import { viewRole } from "../../halloAPIs/createAccessAPI";

const initialState = {
  viewRole: {},
};

export const editRoleAccessSlice = createSlice({
  name: "Edit Access",
  initialState,
  reducers: {
    clearViewRole: (state) => {
      state.viewRole = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(viewRole.fulfilled, (state, action) => {
      if (action.payload) {
        state.viewRole = action.payload?.data?.[0];
      }
    });
  },
});

export default editRoleAccessSlice.reducer;
export const { clearViewRole } = editRoleAccessSlice.actions;
