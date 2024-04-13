import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  CLOSE_CASE,
  CLOSE_CASE_EDIT,
  CLOSE_CASE_VIEW,
} from "../../../../constants/apis/apis";

export const closeCaseView = createAsyncThunk(
  "closeCaseView",
  async (params, { rejectWithValue }) => {
    try {
      let url = `${CLOSE_CASE_VIEW}/${params?.id}`;
      if (params?.sortBy) url += `?sortBy=${params?.sortBy}`;
      if (params?.orderBy) url += `&orderBy=${params?.orderBy}`;
      const response = await Axios.get(url);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const closeCase = createAsyncThunk(
  "closeCase",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(`${CLOSE_CASE}/${params}`);
      return response?.data;
    } catch (error) {
      rejectWithValue(error?.response);
    }
  },
);

export const closeCaseEdit = createAsyncThunk(
  "closeCaseEdit",
  async (params, { rejectWithValue }) => {
    const { id, patientEmail, patientPhoneNumber } = params;
    try {
      const response = await Axios.patch(`${CLOSE_CASE_EDIT}/${id}`, {
        patientPhoneNumber,
        patientEmail,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
