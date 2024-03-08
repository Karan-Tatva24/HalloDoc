import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { NEW_STATE } from "../../constants/apis/apis";

export const newState = createAsyncThunk(
  "newState",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${NEW_STATE}?state=${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
