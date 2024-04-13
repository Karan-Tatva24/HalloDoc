import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  DELETE_RECORD,
  EXPORT_RECORD,
  SEARCH_RECORD,
} from "../../../../constants/apis/apis";

export const searchRecord = createAsyncThunk(
  "searchRecord",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.patientName) newParams.patientName = params.patientName;
    if (params.email) newParams.email = params.email;
    if (params.phoneNumber) newParams.phoneNumber = params.phoneNumber;
    if (params.requestType) newParams.requestType = params.requestType;
    if (params.requestStatus) newParams.requestStatus = params.requestStatus;
    if (params.fromDate) newParams.fromDate = params.fromDate;
    if (params.toDate) newParams.toDate = params.toDate;
    if (params.sortBy) newParams.sortBy = params.sortBy;
    if (params.orderBy) newParams.orderBy = params.orderBy;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(SEARCH_RECORD, { params: newParams });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const deleteRecord = createAsyncThunk(
  "deleteRecord",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`${DELETE_RECORD}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const exportRecord = createAsyncThunk(
  "exportRecord",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(EXPORT_RECORD, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
