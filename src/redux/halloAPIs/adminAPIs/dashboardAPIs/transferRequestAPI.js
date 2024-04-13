import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { TRANSFER_REQUEST } from "../../../../constants/apis/apis";

export const transferRequest = createAsyncThunk(
  "transferRequest",
  async (params, { rejectWithValue }) => {
    const { id, physicianId, transferNote } = params;
    try {
      const response = await Axios.post(`${TRANSFER_REQUEST}/${id}`, {
        physicianId,
        transferNote,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
