import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { NEW_STATE } from "../../constants/apis/apis";

export const newState = createAsyncThunk(
  "newState",
  async (params, { rejectWithValue }) => {
    try {
      let url = `${NEW_STATE}?state=${params.state}`;
      if (params?.search) url += `&search=${params.search}`;
      if (params?.sortBy) url += `&sortBy=${params.sortBy}`;
      if (params?.orderBy) url += `&orderBy=${params.orderBy}`;
      if (params?.region !== "all") url += `&regions=${params.region}`;

      const response = await Axios.get(url);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
