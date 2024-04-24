import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { EDIT_PROFILE } from "../../../constants/apis/apis";

export const editProfile = createAsyncThunk(
  "editProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(EDIT_PROFILE, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
