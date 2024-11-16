import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(persistConfig, cartReducer),
});

const store = configureStore({
  reducer: {
    cart: rootReducer,
  },
});

export const persistor = persistStore(store);
export default store;
