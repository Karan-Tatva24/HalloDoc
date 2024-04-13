import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { CLEAR_CASE } from "../../../../constants/apis/apis";

export const clearCase = createAsyncThunk(
  "clearCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${CLEAR_CASE}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
