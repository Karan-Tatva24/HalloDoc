import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { MY_SCHEDULE } from "../../../../constants/apis/apis";

export const mySchedule = createAsyncThunk(
  "mySchedule",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(MY_SCHEDULE);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
