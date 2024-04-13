import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { PROVIDER_ON_CALL } from "../../../../constants/apis/apis";

export const providerOnCall = createAsyncThunk(
  "providerOnCall",
  async (params, { rejectWithValue }) => {
    const newParams = params.regions !== "all" ? params : {};
    try {
      const response = await Axios.get(PROVIDER_ON_CALL, { params: newParams });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
