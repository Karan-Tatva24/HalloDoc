import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { CONCLUDE_CARE, TYPE_OF_CARE } from "../../../../constants/apis/apis";

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

export const houseCallType = createAsyncThunk(
  "houseCallType",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(`${TYPE_OF_CARE}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const concludeCare = createAsyncThunk(
  "concludeCare",
  async (params, { rejectWithValue }) => {
    const { providerNotes, id } = params;
    try {
      const response = await Axios.patch(`${CONCLUDE_CARE}/${id}`, {
        providerNotes,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
