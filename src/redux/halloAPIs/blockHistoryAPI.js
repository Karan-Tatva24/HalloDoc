import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { BLOCK_HISTORY, UNBLOCK_PATIENT } from "../../constants/apis/apis";

export const blockHistory = createAsyncThunk(
  "blockHistory",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.name) newParams.name = params.name;
    if (params.email) newParams.email = params.email;
    if (params.phone) newParams.phone = params.phone;
    if (params.sortBy) newParams.sortBy = params.sortBy;
    if (params.orderBy) newParams.orderBy = params.orderBy;
    if (params.date) newParams.date = params.date;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(BLOCK_HISTORY, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const unblockPatient = createAsyncThunk(
  "unblockPatient",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(`${UNBLOCK_PATIENT}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
