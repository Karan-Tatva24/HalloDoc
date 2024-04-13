import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { CREATE_ADMIN_REQUEST } from "../../../constants/apis/apis";

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
        isEmail: false,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
