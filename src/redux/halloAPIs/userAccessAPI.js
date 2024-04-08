import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { USER_ACCESS } from "../../constants/apis/apis";

export const userAccess = createAsyncThunk(
  "userAccess",
  async (params, { rejectWithValue }) => {
    try {
      let url = USER_ACCESS;
      if (params?.accountType) url += `?accountType=${params.accountType}`;
      if (params?.sortBy) url += `&sortBy=${params.sortBy}`;
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
