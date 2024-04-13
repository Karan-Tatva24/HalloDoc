import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  GET_SEND_AGREEMENT,
  SEND_AGREEMENT,
} from "../../../../constants/apis/apis";

export const sendAgreement = createAsyncThunk(
  "sendAgreement",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${SEND_AGREEMENT}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const getSendAgreement = createAsyncThunk(
  "getSendAgreement",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GET_SEND_AGREEMENT}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
