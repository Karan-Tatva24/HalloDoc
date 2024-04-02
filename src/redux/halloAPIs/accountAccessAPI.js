import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { ACCOUNT_ACCESS } from "../../constants/apis/apis";

export const accountAccess = createAsyncThunk(
  "accountAccess",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(ACCOUNT_ACCESS);
      return response?.data;
    } catch (error) {
      rejectWithValue(error?.response);
    }
  },
);
