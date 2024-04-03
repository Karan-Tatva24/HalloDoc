import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { VERIFY_STATE } from "../../constants/apis/apis";

export const verifyState = createAsyncThunk(
  "verifyState",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(VERIFY_STATE, { state: params });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
