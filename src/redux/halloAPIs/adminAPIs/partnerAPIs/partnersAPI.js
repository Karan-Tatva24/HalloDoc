import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  ADD_BUSINESS,
  DELETE_BUSINESS,
  GET_VENDOR,
  UPDATE_BUSINESS,
  VIEW_BUSINESS,
} from "../../../../constants/apis/apis";

export const getVendor = createAsyncThunk(
  "getVendor",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.search) newParams.search = params.search;
    if (params.professions !== "all")
      newParams.professions = params.professions;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;

    try {
      const response = await Axios.get(GET_VENDOR, { params: newParams });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const addBusiness = createAsyncThunk(
  "addBusiness",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(ADD_BUSINESS, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const viewBusiness = createAsyncThunk(
  "viewBusiness",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_BUSINESS}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const updateBusiness = createAsyncThunk(
  "updateBusiness",
  async (params, { rejectWithValue }) => {
    const { id, data } = params;
    try {
      const response = await Axios.patch(`${UPDATE_BUSINESS}/${id}`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const deleteBusiness = createAsyncThunk(
  "deleteBusiness",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`${DELETE_BUSINESS}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
