import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { CHANGE_PASSWORD } from "../../constants/apis/apis";

export const changePassword = createAsyncThunk(
  "changePassword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(CHANGE_PASSWORD, {
        password: params,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
