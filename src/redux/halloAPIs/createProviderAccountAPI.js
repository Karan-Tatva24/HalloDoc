import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import { CREATE_PROVIDER_ACCOUNT } from "../../constants/apis/apis";

export const createProviderAccount = createAsyncThunk(
  "createProviderAccount",
  async (params, { rejectWithValue }) => {
    const {
      accountType,
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      medicalLicense,
      NPINumber,
      regions,
      address1,
      address2,
      city,
      state,
      zipCode,
      altPhone,
      businessName,
      businessWebsite,
      //   files,
    } = params;
    try {
      const response = await Axios.post(
        CREATE_PROVIDER_ACCOUNT,
        {
          accountType,
          userName,
          password,
          firstName,
          lastName,
          email,
          phoneNumber,
          medicalLicense,
          NPINumber,
          regions,
          address1,
          address2,
          city,
          state,
          zipCode,
          altPhone,
          businessName,
          businessWebsite,
          //   files,
        },
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
