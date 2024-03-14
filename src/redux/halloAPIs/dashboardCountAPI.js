import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { DESHBOARD_COUNT } from "../../constants/apis/apis";

export const dashboardCount = createAsyncThunk(
  "Deshboard Count",
  async (args, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${DESHBOARD_COUNT}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
