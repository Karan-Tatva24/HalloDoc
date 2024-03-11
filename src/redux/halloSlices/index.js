import { combineReducers } from "@reduxjs/toolkit";
import loginSliceReducer from "./loginSlice";
import newStateSliceReducer from "./newStateSlice";
import viewCaseSliceReducer from "./viewReservationSlice";
import viewNotesSliceReducer from "./viewNotesSlice";

export const rootReducer = combineReducers({
  login: loginSliceReducer,
  newState: newStateSliceReducer,
  viewCase: viewCaseSliceReducer,
  viewNotes: viewNotesSliceReducer,
});
