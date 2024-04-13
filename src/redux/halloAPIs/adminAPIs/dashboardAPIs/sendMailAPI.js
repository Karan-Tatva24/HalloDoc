import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { SEND_MAIL } from "../../../../constants/apis/apis";

export const sendMail = createAsyncThunk(
  "sendMail",
  async (params, { rejectWithValue }) => {
    const { email, files } = params;
    try {
      const response = await Axios.post(SEND_MAIL, { email, files });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
