import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  ADD_NEW_SHIFT,
  EDIT_SHIFT,
  TOGGLE_APPROVED,
  VIEW_SHIFT,
  VIEW_SHIFT_BY_DATE,
} from "../../../../constants/apis/apis";

export const viewShiftByDate = createAsyncThunk(
  "viewShiftByDate",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.date) newParams.date = params.date;
    if (params.week) newParams.week = params.week;
    if (params.month) newParams.month = params.month;
    if (params.startDate) newParams.startDate = params.startDate;
    if (params.endDate) newParams.endDate = params.endDate;
    if (params.regions !== "all") newParams.regions = params.regions;

    try {
      const response = await Axios.get(VIEW_SHIFT_BY_DATE, {
        params: newParams,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const viewShift = createAsyncThunk(
  "viewShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_SHIFT}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const addNewShift = createAsyncThunk(
  "addNewShift",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(ADD_NEW_SHIFT, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const editShift = createAsyncThunk(
  "editShift",
  async (params, { rejectWithValue }) => {
    const { shiftDate, startTime, endTime, id } = params;
    try {
      const response = await Axios.patch(`${EDIT_SHIFT}/${id}`, {
        shiftDate,
        startTime,
        endTime,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const toggleApproved = createAsyncThunk(
  "toggleApproved",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(`${TOGGLE_APPROVED}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
