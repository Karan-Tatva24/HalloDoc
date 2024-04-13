import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { LOGIN_API } from "../../../constants/apis/apis";

export const userLogin = createAsyncThunk(
  "userLogin",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(LOGIN_API, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
