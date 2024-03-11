import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { VIEW_NOTES } from "../../constants/apis/apis";

export const viewNotes = createAsyncThunk(
  "viewNotes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_NOTES}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
