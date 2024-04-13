import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { DELETE_FILE } from "../../../../constants/apis/apis";

export const deleteFile = createAsyncThunk(
  "deleteFile",
  async (params, { rejectWithValue }) => {
    const { fileNames, id } = params;
    try {
      const response = await Axios.delete(`${DELETE_FILE}/${id}`, {
        data: { fileNames },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
