import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { UPDATE_PROVIDER_NOTES } from "../../../../constants/apis/apis";

export const updateProviderNotes = createAsyncThunk(
  "updateProviderNotes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(
        `${UPDATE_PROVIDER_NOTES}/${params.id}`,
        {
          physicianNotes: params.value,
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
