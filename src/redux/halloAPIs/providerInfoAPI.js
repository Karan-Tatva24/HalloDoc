import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import {
  CONTACT_PROVIDER,
  DELETE_PROVIDER_ACCOUNT,
  EDIT_PROVIDER_PROFILE,
  PHYSICIAN_PROFILE,
  PROVIDER_INFO,
  UPDATE_NOTIFICATION,
} from "../../constants/apis/apis";

export const providerInfo = createAsyncThunk(
  "providerInfo",
  async (params, { rejectWithValue }) => {
    try {
      let url = PROVIDER_INFO;
      if (params?.regions) url += `?regions=${params.regions}`;
      if (params?.sortBy) url += `&sortBy=${params.sortBy}`;
      if (params?.orderBy) url += `&orderBy=${params.orderBy}`;
      if (params?.page) url += `&page=${params.page}`;
      if (params?.pageSize) url += `&pageSize=${params.pageSize}`;

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
        roleId: data?.role.toString(),
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
        regions: data?.regions,
        syncEmailAddress: data?.syncEmailAddress,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const updateNotification = createAsyncThunk(
  "updateNotification",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(UPDATE_NOTIFICATION, {
        physicianIds: params,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const deleteProviderAccount = createAsyncThunk(
  "deleteProviderAccount",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `${DELETE_PROVIDER_ACCOUNT}/${params}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
