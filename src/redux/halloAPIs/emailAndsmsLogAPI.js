import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { EMAIL_LOGS, SMS_LOGS } from "../../constants/apis/apis";

export const emailLog = createAsyncThunk(
  "emailLog",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.receiverName) newParams.receiverName = params.receiverName;
    if (params.email) newParams.email = params.email;
    if (params.createdDate) newParams.createdDate = params.createdDate;
    if (params.sentDate) newParams.sentDate = params.sentDate;
    if (params.sortBy) newParams.sortBy = params.sortBy;
    if (params.orderBy) newParams.orderBy = params.orderBy;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(EMAIL_LOGS, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const smsLog = createAsyncThunk(
  "smsLog",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.receiverName) newParams.receiverName = params.receiverName;
    if (params.email) newParams.email = params.email;
    if (params.createdDate) newParams.createdDate = params.createdDate;
    if (params.sentDate) newParams.sentDate = params.sentDate;
    if (params.sortBy) newParams.sortBy = params.sortBy;
    if (params.orderBy) newParams.orderBy = params.orderBy;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(SMS_LOGS, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
