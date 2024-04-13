import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { GET_ROLE } from "../../../../constants/apis/apis";

export const getRoles = createAsyncThunk(
  "getRoles",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(GET_ROLE, { params });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
