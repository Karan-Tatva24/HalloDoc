import { combineReducers } from "@reduxjs/toolkit";
import loginSliceReducer from "./loginSlice";
import newStateSliceReducer from "./newStateSlice";
import viewCaseSliceReducer from "./viewReservationSlice";
import viewNotesSliceReducer from "./viewNotesSlice";
import getPatientNameSliceReducer from "./getPatientNameSlice";
import getDashboardCountSliceReducer from "./getDashboardCountSlice";
import getRegionPhysicianSliceReducer from "./getRegionPhysicianSlice";

export const rootReducer = combineReducers({
  login: loginSliceReducer,
  newState: newStateSliceReducer,
  viewCase: viewCaseSliceReducer,
  viewNotes: viewNotesSliceReducer,
  patientName: getPatientNameSliceReducer,
  dashboardCount: getDashboardCountSliceReducer,
  getRegionPhysician: getRegionPhysicianSliceReducer,
});
