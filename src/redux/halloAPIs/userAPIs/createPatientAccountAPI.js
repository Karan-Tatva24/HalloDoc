import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { CREATE_ACCOUNT } from "../../../constants/apis/apis";

export const createPatientAccount = createAsyncThunk(
  "createPatientAccount",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(CREATE_ACCOUNT, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
