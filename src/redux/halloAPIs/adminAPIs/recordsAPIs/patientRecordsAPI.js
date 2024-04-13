import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  PATIENT_HISTORY,
  PATIENT_RECORD,
} from "../../../../constants/apis/apis";

export const patientHistory = createAsyncThunk(
  "patientHistory",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.firstName) newParams.firstName = params.firstName;
    if (params.lastName) newParams.lastName = params.lastName;
    if (params.email) newParams.email = params.email;
    if (params.phone) newParams.phone = params.phone;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(PATIENT_HISTORY, { params: newParams });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const patientRecord = createAsyncThunk(
  "patientRecord",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.sortBy) newParams.sortBy = params.sortBy;
    if (params.orderBy) newParams.orderBy = params.orderBy;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(`${PATIENT_RECORD}/${params.id}`, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
