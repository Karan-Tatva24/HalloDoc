import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { TYPE_OF_CARE } from "../../../../constants/apis/apis";

export const typeOfCare = createAsyncThunk(
  "typeOfCare",
  async (params, { rejectWithValue }) => {
    const { id, typeOfCare } = params;
    try {
      const response = await Axios.patch(`${TYPE_OF_CARE}/${id}`, {
        typeOfCare,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
