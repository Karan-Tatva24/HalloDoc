import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { PROVIDER_TRANSFER_REQUEST } from "../../../../constants/apis/apis";

export const providerTransferRequest = createAsyncThunk(
  "providerTransferRequest",
  async (params, { rejectWithValue }) => {
    const { id } = params;
    try {
      const response = await Axios.patch(`${PROVIDER_TRANSFER_REQUEST}/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
