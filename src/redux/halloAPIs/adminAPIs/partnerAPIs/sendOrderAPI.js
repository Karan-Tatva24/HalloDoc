import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { SEND_ORDER, VIEW_ORDER } from "../../../../constants/apis/apis";

export const viewSendOrder = createAsyncThunk(
  "viewSendOrder",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_ORDER}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const sendOrder = createAsyncThunk(
  "sendOrder",
  async (params, { rejectWithValue }) => {
    const { id, prescription, noOfRefill } = params;
    try {
      const response = await Axios.post(`${SEND_ORDER}/${id}`, {
        prescription,
        noOfRefill,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
