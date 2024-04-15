import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { ACCEPT_REQUEST } from "../../../../constants/apis/apis";

export const acceptRequest = createAsyncThunk(
  "acceptRequest",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(`${ACCEPT_REQUEST}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
