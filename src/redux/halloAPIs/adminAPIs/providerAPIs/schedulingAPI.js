import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  APPROVE_SHIFT,
  DELETE_SHIFT,
  UNAPPROVED_SHIFT,
} from "../../../../constants/apis/apis";

export const unApprovedShift = createAsyncThunk(
  "unApprovedShift",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.regions !== "all") newParams.regions = params.regions;
    if (params.sortBy) newParams.sortBy = params.sortBy;
    if (params.orderBy) newParams.orderBy = params.orderBy;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(UNAPPROVED_SHIFT, { params: newParams });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const approveShift = createAsyncThunk(
  "approveShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.put(APPROVE_SHIFT, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const deleteShift = createAsyncThunk(
  "deleteShift",
  async (params, { rejectWithValue }) => {
    const { shiftIds } = params;
    try {
      const response = await Axios.delete(DELETE_SHIFT, { data: { shiftIds } });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
