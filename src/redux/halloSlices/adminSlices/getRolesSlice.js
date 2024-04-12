import { createSlice } from "@reduxjs/toolkit";
import { getRoles } from "../../halloAPIs/getRoleAPI";

const initialState = {
  roles: [],
};

export const getRolesSlice = createSlice({
  name: "Get Roles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action.payload.data;
    });
  },
});

export default getRolesSlice.reducer;
