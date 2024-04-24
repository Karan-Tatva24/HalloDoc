import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import {
  ACCEPT_AGREEMENT,
  CANCEL_AGREEMENT,
} from "../../../constants/apis/apis";

export const acceptAgreement = createAsyncThunk(
  "acceptAgreement",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(
        `${ACCEPT_AGREEMENT}/${params?.toString()}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const cancelAgreement = createAsyncThunk(
  "cancelAgreement",
  async (params, { rejectWithValue }) => {
    const { id, reasonForCancellation } = params;
    try {
      const response = await Axios.patch(`${CANCEL_AGREEMENT}/${id}`, {
        reasonForCancellation,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
