import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { RESET_PASS } from "../../../constants/apis/apis";

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${RESET_PASS}/${params.token}`, {
        ...params.values,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
