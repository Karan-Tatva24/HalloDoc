import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { CREATE_PROVIDER_ACCOUNT } from "../../../constants/apis/apis";

export const createProviderAccount = createAsyncThunk(
  "createProviderAccount",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(CREATE_PROVIDER_ACCOUNT, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
