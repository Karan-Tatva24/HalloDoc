import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { ACCOUNT_ACCESS } from "../../../../constants/apis/apis";

export const accountAccess = createAsyncThunk(
  "accountAccess",
  async (params, { rejectWithValue }) => {
    try {
      let url = ACCOUNT_ACCESS;
      if (params?.sortBy) url += `?sortBy=${params.sortBy}`;
      if (params?.orderBy) url += `&orderBy=${params.orderBy}`;
      if (params?.page) url += `&page=${params.page}`;
      if (params?.pageSize) url += `&pageSize=${params.pageSize}`;

      const response = await Axios.get(url);
      return response?.data;
    } catch (error) {
      rejectWithValue(error?.response);
    }
  },
);
