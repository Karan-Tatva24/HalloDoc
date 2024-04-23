import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { MEDICAL_HISTORY } from "../../../constants/apis/apis";

export const medicalHistory = createAsyncThunk(
  "medicalHistory",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.sortBy) newParams.sortBy = params.sortBy;
    if (params.orderBy) newParams.orderBy = params.orderBy;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(MEDICAL_HISTORY, { params: newParams });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
