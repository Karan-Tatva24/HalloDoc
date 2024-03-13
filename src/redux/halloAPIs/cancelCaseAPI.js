import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { CANCEL_CASE } from "../../constants/apis/apis";

export const cancelCase = createAsyncThunk(
  "cancelCase",
  async (params, { rejectWithValue }) => {
    const { id, adminNotes, reasonForCancellation } = params;
    try {
      const response = await Axios.patch(`${CANCEL_CASE}/${id}`, {
        adminNotes,
        reasonForCancellation,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
