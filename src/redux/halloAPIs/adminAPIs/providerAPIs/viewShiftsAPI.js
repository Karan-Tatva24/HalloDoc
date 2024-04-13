import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { ADD_NEW_SHIFT } from "../../../../constants/apis/apis";

export const addNewShift = createAsyncThunk(
  "addNewShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(ADD_NEW_SHIFT, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
