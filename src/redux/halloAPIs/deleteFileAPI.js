import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { DELETE_FILE } from "../../constants/apis/apis";

export const deleteFile = createAsyncThunk(
  "deleteFile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(DELETE_FILE, {
        fileNames: params,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
