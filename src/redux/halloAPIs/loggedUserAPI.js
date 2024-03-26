import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { COMMON_API } from "../../constants/apis/apis";

export const loggedUser = createAsyncThunk(
  "loggedUser",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${COMMON_API}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
