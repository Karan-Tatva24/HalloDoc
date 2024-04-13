import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { FORGOT_PASS } from "../../../constants/apis/apis";

export const forgotPass = createAsyncThunk(
  "forgotPass",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(FORGOT_PASS, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
