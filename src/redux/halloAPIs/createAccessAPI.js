import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";
import {
  CREATE_ACCESS,
  GET_ROLE_BY_ACCOUNT_TYPE,
  UPDATE_ROLE,
  VIEW_ROLE,
} from "../../constants/apis/apis";

export const getRolesByAccountType = createAsyncThunk(
  "getRolesByAccountType",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${GET_ROLE_BY_ACCOUNT_TYPE}?accountTypes=${params}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const createAccess = createAsyncThunk(
  "createAccess",
  async (params, { rejectWithValue }) => {
    const { accountType, roleName, permissionIds } = params;
    try {
      const response = await Axios.post(CREATE_ACCESS, {
        accountType,
        roleName,
        permissionIds,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const viewRole = createAsyncThunk(
  "viewRole",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${VIEW_ROLE}/${params}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);

export const updateRole = createAsyncThunk(
  "updateRole",
  async (params, { rejectWithValue }) => {
    const { id, data } = params;
    try {
      const response = await Axios.patch(`${UPDATE_ROLE}/${id}`, {
        accountType: data.accountType,
        roleName: data.roleName,
        permissionIds: data.permissionIds,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  },
);
