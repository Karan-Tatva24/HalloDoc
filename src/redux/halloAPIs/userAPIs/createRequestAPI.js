import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import {
  CREATE_ADMIN_REQUEST,
  CREATE_REQUEST,
  IS_EMAIL_FOUND,
} from "../../../constants/apis/apis";

export const isEmailFound = createAsyncThunk(
  "isEmailFound",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(IS_EMAIL_FOUND, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const createRequestByAdminProvider = createAsyncThunk(
  "createRequestByAdminProvider",
  async (params, { rejectWithValue }) => {
    const {
      patientFirstName,
      patientLastName,
      patientEmail,
      patientPhoneNumber,
      street,
      city,
      state,
      zipCode,
      dob,
      roomNumber,
      patientNote,
      requestType,
      isEmail,
    } = params;
    try {
      const response = await Axios.post(CREATE_ADMIN_REQUEST, {
        patientFirstName,
        patientLastName,
        patientEmail,
        patientPhoneNumber,
        street,
        city,
        state,
        zipCode,
        dob,
        roomNumber,
        patientNote,
        requestType,
        isEmail,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const createRequest = createAsyncThunk(
  "createRequest",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(CREATE_REQUEST, params);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
