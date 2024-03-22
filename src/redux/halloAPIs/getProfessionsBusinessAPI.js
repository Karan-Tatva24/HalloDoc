import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { GET_BUSINESS, GET_PROFESSIONS } from "../../constants/apis/apis";

export const getProfession = createAsyncThunk(
  "getProfession",
  async (args, { rejectWithValue }) => {
    try {
      const response = await Axios.get(GET_PROFESSIONS);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getBusiness = createAsyncThunk(
  "getBusiness",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GET_BUSINESS}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
