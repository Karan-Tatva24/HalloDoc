import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { ADMIN_PROFILE, EDIT_ADMIN_PROFILE } from "../../constants/apis/apis";

export const adminProfile = createAsyncThunk(
  "adminProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${ADMIN_PROFILE}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const editAdminProfile = createAsyncThunk(
  "editAdminProfile",
  async (params, { rejectWithValue }) => {
    const { id, section, updatedData } = params;
    try {
      const response = await Axios.patch(`${EDIT_ADMIN_PROFILE}/${id}`, {
        section,
        updatedData,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
