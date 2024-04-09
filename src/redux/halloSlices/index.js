import { combineReducers } from "@reduxjs/toolkit";
import loginSliceReducer from "./loginSlice";
import newStateSliceReducer from "./newStateSlice";
import viewCaseSliceReducer from "./viewReservationSlice";
import viewNotesSliceReducer from "./viewNotesSlice";
import getPatientNameSliceReducer from "./getPatientNameSlice";
import getDashboardCountSliceReducer from "./getDashboardCountSlice";
import getRegionPhysicianSliceReducer from "./getRegionPhysicianSlice";
import viewUploadSliceReducer from "./viewUploadSlice";
import getProfessionBusinessSliceReducer from "./getProfessionsBusinessSlice";
import closeCaseSliceReducer from "./closeCaseSlice";
import loggedUserDataSliceReducer from "./loggedUserDataSlice";
import adminProfileSliceReducer from "./adminProfileSlice";
import accountAccessSliceReducer from "./accountAccessSlice";
import providerInfoSliceReducer from "./providerInfoSlice";
import userAccessSliceReducer from "./userAccessSlice";
import createAccessSliceReducer from "./createAccessSlice";
import recordsSliceReducer from "./recordsSlice";

export const rootReducer = combineReducers({
  login: loginSliceReducer,
  newState: newStateSliceReducer,
  viewCase: viewCaseSliceReducer,
  viewNotes: viewNotesSliceReducer,
  patientName: getPatientNameSliceReducer,
  dashboardCount: getDashboardCountSliceReducer,
  getRegionPhysician: getRegionPhysicianSliceReducer,
  getProfessionsBusiness: getProfessionBusinessSliceReducer,
  viewUpload: viewUploadSliceReducer,
  closeCase: closeCaseSliceReducer,
  loggedUserData: loggedUserDataSliceReducer,
  adminProfile: adminProfileSliceReducer,
  accountAccess: accountAccessSliceReducer,
  createAccess: createAccessSliceReducer,
  userAccess: userAccessSliceReducer,
  providerInfo: providerInfoSliceReducer,
  records: recordsSliceReducer,
});
