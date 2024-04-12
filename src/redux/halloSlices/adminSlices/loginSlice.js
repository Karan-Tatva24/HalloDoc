import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../halloAPIs/loginAPI";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  token: "",
};

export const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.token) {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      }
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
