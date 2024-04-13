import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { DOWNLOAD_FILE } from "../../../../constants/apis/apis";

export const downloadFile = createAsyncThunk(
  "downloadFile",
  async (params, { rejectWithValue }) => {
    const { fileNames } = params;
    try {
      const response = await Axios.post(
        DOWNLOAD_FILE,
        {
          fileNames,
        },
        {
          responseType: "blob",
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
