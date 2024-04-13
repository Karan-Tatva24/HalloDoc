import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { VIEW_CASE } from "../../../../constants/apis/apis";

export const viewCase = createAsyncThunk(
  "viewCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_CASE}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
