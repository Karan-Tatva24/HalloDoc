import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { GET_PHYSICIAN, GET_REGION } from "../../constants/apis/apis";

export const getRegions = createAsyncThunk(
  "getRegions",
  async (args, { rejectWithValue }) => {
    try {
      const response = await Axios.get(GET_REGION);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getPhysician = createAsyncThunk(
  "getPhysician",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GET_PHYSICIAN}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
