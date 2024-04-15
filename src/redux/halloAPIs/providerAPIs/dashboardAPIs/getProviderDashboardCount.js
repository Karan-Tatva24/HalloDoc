import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { PROVIDER_DASHBOARD_COUNT } from "../../../../constants/apis/apis";

export const getProviderDashboardCount = createAsyncThunk(
  "getProviderDashboardCount",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(PROVIDER_DASHBOARD_COUNT);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
