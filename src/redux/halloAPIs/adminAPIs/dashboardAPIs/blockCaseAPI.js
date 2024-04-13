import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { BLOCK_CASE } from "../../../../constants/apis/apis";

export const blockCase = createAsyncThunk(
  "blockCase",
  async (params, { rejectWithValue }) => {
    const { id, reasonForCancellation } = params;
    try {
      const response = await Axios.patch(`${BLOCK_CASE}/${id}`, {
        reasonForCancellation,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
