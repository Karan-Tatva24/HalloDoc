import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { DASHBOARD_COUNT } from "../../../../constants/apis/apis";

export const dashboardCount = createAsyncThunk(
  "Dashboard Count",
  async (args, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${DASHBOARD_COUNT}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
