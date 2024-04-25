import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const apiStatusSlice = createSlice({
  name: "API Status",
  initialState,
  reducers: {
    apiPending: (state) => {
      state.isLoading = true;
    },
    apiSuccess: (state) => {
      state.isLoading = false;
    },
    apiFails: (state) => {
      state.isLoading = false;
    },
  },
});

export default apiStatusSlice.reducer;
export const { apiPending, apiSuccess, apiFails } = apiStatusSlice.actions;
