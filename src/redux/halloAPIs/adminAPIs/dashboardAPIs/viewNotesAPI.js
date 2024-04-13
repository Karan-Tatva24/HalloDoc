import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import { UPDATE_NOTES, VIEW_NOTES } from "../../../../constants/apis/apis";

export const viewNotes = createAsyncThunk(
  "viewNotes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_NOTES}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const viewNotesPost = createAsyncThunk(
  "viewNotesPost",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(`${UPDATE_NOTES}/${params.id}`, {
        adminNotes: params.value,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
