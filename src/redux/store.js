import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { rootReducer } from "./halloSlices";
import sendOrderSliceReducer from "./halloSlices/adminSlices/sendOrderSlice";
import sendAgreementSliceReducer from "./halloSlices/adminSlices/sendAgreementSlice";
import editRoleAccessSliceReducer from "./halloSlices/adminSlices/editRoleAccessSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
    sendOrder: sendOrderSliceReducer,
    sendAgreement: sendAgreementSliceReducer,
    editRoleAccess: editRoleAccessSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
