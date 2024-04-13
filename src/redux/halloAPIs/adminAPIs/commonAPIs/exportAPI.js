import { createAsyncThunk } from "@reduxjs/toolkit";
import { EXPORT, EXPORT_ALL } from "../../../../constants/apis/apis";
import Axios from "../../../../config/axios";

export const exportByState = createAsyncThunk(
  "exportByState",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${EXPORT}/${params}`, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const exportAll = createAsyncThunk(
  "exportAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(EXPORT_ALL, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
