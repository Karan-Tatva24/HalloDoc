import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../config/axios";
import { PROVIDER_DASHBOARD_BY_STATE } from "../../../constants/apis/apis";

export const getDashboardByState = createAsyncThunk(
  "getDashboardByState",
  async (params, { rejectWithValue }) => {
    const newParams = {};
    if (params.state) newParams.state = params.state;
    if (params.search) newParams.search = params.search;
    if (params.requestType) newParams.requestType = params.requestType;
    if (params.page) newParams.page = params.page;
    if (params.pageSize) newParams.pageSize = params.pageSize;
    try {
      const response = await Axios.get(PROVIDER_DASHBOARD_BY_STATE, {
        params: newParams,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);
