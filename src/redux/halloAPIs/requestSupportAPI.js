import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { REQUEST_SUPPORT } from "../../constants/apis/apis";

export const requestSupport = createAsyncThunk(
  "requestSupport",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(REQUEST_SUPPORT, {
        message: params,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
