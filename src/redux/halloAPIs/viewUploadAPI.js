import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { VIEW_UPLOAD } from "../../constants/apis/apis";

export const viewUpload = createAsyncThunk(
  "viewUpload",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_UPLOAD}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
