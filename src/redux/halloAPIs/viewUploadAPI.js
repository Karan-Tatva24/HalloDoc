import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { UPLOAD_FILE, VIEW_UPLOAD } from "../../constants/apis/apis";

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

export const uploadFile = createAsyncThunk(
  "uploadFile",
  async (params, { rejectWithValue }) => {
    const { id, formData } = params;
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const response = await Axios.post(
        `${UPLOAD_FILE}/${id}`,
        formData,
        config,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
