import { combineReducers } from "@reduxjs/toolkit";
import loginSliceReducer from "./adminSlices/loginSlice";
import newStateSliceReducer from "./adminSlices/newStateSlice";
import viewCaseSliceReducer from "./adminSlices/viewReservationSlice";
import viewNotesSliceReducer from "./adminSlices/viewNotesSlice";
import getPatientNameSliceReducer from "./adminSlices/getPatientNameSlice";
import getDashboardCountSliceReducer from "./adminSlices/getDashboardCountSlice";
import getRegionPhysicianSliceReducer from "./adminSlices/getRegionPhysicianSlice";
import viewUploadSliceReducer from "./adminSlices/viewUploadSlice";
import getProfessionBusinessSliceReducer from "./adminSlices/getProfessionsBusinessSlice";
import closeCaseSliceReducer from "./adminSlices/closeCaseSlice";
import loggedUserDataSliceReducer from "./adminSlices/loggedUserDataSlice";
import adminProfileSliceReducer from "./adminSlices/adminProfileSlice";
import accountAccessSliceReducer from "./adminSlices/accountAccessSlice";
import providerInfoSliceReducer from "./adminSlices/providerInfoSlice";
import userAccessSliceReducer from "./adminSlices/userAccessSlice";
import createAccessSliceReducer from "./adminSlices/createAccessSlice";
import recordsSliceReducer from "./adminSlices/recordsSlice";
import providerOnCallSliceReducer from "./adminSlices/providerOnCallSlice";
import partnersSliceReducer from "./adminSlices/partnersSlice";
import getRolesSliceReducer from "./adminSlices/getRolesSlice";
import schedulingSliceReducer from "./adminSlices/schedulingSlice";
import dashboardByStateSlice from "./providerSlices/dashboardByStateSlice";

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
  providerOnCall: providerOnCallSliceReducer,
  partners: partnersSliceReducer,
  getRoles: getRolesSliceReducer,
  scheduling: schedulingSliceReducer,
  dashboardByState: dashboardByStateSlice,
});
