import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../../config/axios";
import {
  CONCLUDE_CARE,
  DOWNLOAD,
  EDIT_ENCOUNTER_FORM,
  FINALIZE_FORM,
  GET_ENCOUNTER_FORM,
  HOUSE_CALL_TYPE,
  SAVE_ENCOUNTER_FORM,
  TYPE_OF_CARE,
} from "../../../../constants/apis/apis";

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
      const response = await Axios.patch(`${HOUSE_CALL_TYPE}/${params}`);
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

export const getEncounterForm = createAsyncThunk(
  "getEncounterForm",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${GET_ENCOUNTER_FORM}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const editEncounterForm = createAsyncThunk(
  "editEncounterForm",
  async (params, { rejectWithValue }) => {
    const { id, data } = params;
    try {
      const response = await Axios.patch(`${EDIT_ENCOUNTER_FORM}/${id}`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const saveEncounterForm = createAsyncThunk(
  "saveEncounterForm",
  async (params, { rejectWithValue }) => {
    const { data, id } = params;
    try {
      const response = await Axios.post(`${SAVE_ENCOUNTER_FORM}/${id}`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const finalizeForm = createAsyncThunk(
  "finalizeForm",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.patch(`${FINALIZE_FORM}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const download = createAsyncThunk(
  "download",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${DOWNLOAD}/${params}`, {
        responseType: "blob",
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
