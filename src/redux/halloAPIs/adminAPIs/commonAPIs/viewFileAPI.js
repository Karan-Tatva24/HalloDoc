import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { VIEW_FILE } from "../../../../constants/apis/apis";

export const viewFile = createAsyncThunk(
  "viewFile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_FILE}/${params}`, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
