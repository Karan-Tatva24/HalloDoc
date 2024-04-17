import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { REQUEST_TO_ADMIN } from "../../../../constants/apis/apis";

export const requestToAdmin = createAsyncThunk(
  "requestToAdmin",
  async (params, { rejectWithValue }) => {
    const { id, message } = params;
    try {
      const response = await Axios.post(`${REQUEST_TO_ADMIN}/${id}`, {
        message,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
