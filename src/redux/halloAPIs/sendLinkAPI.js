import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { SEND_LINK } from "../../constants/apis/apis";

export const sendLink = createAsyncThunk(
  "sendLink",
  async (params, { rejectWithValue }) => {
    const { phoneNumber, firstName, lastName, email } = params;
    try {
      const response = await Axios.post(SEND_LINK, {
        firstName,
        lastName,
        phoneNumber,
        email,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
