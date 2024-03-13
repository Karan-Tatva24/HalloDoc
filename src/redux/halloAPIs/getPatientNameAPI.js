import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { PATIENT_NAME } from "../../constants/apis/apis";

export const getPatientName = createAsyncThunk(
  "getPatientName",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${PATIENT_NAME}/${params}`, {
        withAuthToken: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
