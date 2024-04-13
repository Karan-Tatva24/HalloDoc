import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { ASSIGN_CASE } from "../../../../constants/apis/apis";

export const assignCase = createAsyncThunk(
  "assignCase",
  async (params, { rejectWithValue }) => {
    const { id, physicianId, transferNote } = params;
    try {
      const response = await Axios.post(`${ASSIGN_CASE}/${id}`, {
        physicianId,
        transferNote,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
