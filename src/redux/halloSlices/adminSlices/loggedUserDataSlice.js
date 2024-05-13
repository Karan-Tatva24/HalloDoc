import { createSlice } from "@reduxjs/toolkit";
import { loggedUser } from "../../halloAPIs/adminAPIs/commonAPIs/loggedUserAPI";

const initialState = {
  id: "",
  userName: "",
  accountType: "",
};

export const loggedUserDataSlice = createSlice({
  name: "Logged User Data",
  initialState,
  reducers: {
    clearAccountType: (state) => {
      state.accountType = "";
      state.id = "";
      state.userName = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loggedUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.id = action.payload?.data?.[0]?.id;
        state.userName = action.payload?.data?.[0]?.userName;
        state.accountType = action.payload?.data?.[0]?.accountType;
      }
    });
  },
});

export default loggedUserDataSlice.reducer;
export const { clearAccountType } = loggedUserDataSlice.actions;
