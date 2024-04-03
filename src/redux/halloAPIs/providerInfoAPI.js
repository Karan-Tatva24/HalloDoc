import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import {
  CONTACT_PROVIDER,
  EDIT_PROVIDER_PROFILE,
  PHYSICIAN_PROFILE,
  PROVIDER_INFO,
} from "../../constants/apis/apis";

export const providerInfo = createAsyncThunk(
  "providerInfo",
  async (params, { rejectWithValue }) => {
    try {
      let url = PROVIDER_INFO;
      if (params !== "all") url += `?regions=${params}`;

      const response = await Axios.get(url);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const contactProvider = createAsyncThunk(
  "contactProvider",
  async (params, { rejectWithValue }) => {
    const { id, messageBody, contactMethod } = params;
    try {
      const response = await Axios.post(`${CONTACT_PROVIDER}/${id}`, {
        messageBody,
        contactMethod,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const physicianProfile = createAsyncThunk(
  "physicianProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${PHYSICIAN_PROFILE}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const editProviderProfile = createAsyncThunk(
  "editProviderProfile",
  async (params, { rejectWithValue }) => {
    const { id, data } = params;
    try {
      const response = await Axios.patch(`${EDIT_PROVIDER_PROFILE}/${id}`, {
        password: data?.password,
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
        address1: data?.address1,
        address2: data?.address2,
        city: data?.city,
        state: data?.state,
        zipCode: data?.zipCode,
        altPhone: data?.altPhone,
        status: data?.status,
        medicalLicense: data?.medicalLicense,
        NPINumber: data?.NPINumber,
        businessName: data?.businessName,
        signature: data?.signature,
        photo: data?.photo,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
