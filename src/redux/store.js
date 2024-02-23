import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import loginReducer from "./halloSlices/loginSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

export const store = configureStore({
  reducer: {
    login: persistedReducer,
  },
});

export const persistor = persistStore(store);
