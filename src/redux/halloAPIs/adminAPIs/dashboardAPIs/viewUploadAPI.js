import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { UPLOAD_FILE, VIEW_UPLOAD } from "../../../../constants/apis/apis";

export const viewUpload = createAsyncThunk(
  "viewUpload",
  async (params, { rejectWithValue }) => {
    try {
      let url = `${VIEW_UPLOAD}/${params?.id}`;
      if (params?.sortBy) url += `?sortBy=${params?.sortBy}`;
      if (params?.orderBy) url += `&orderBy=${params?.orderBy}`;
      const response = await Axios.get(url);
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
