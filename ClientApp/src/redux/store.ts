import { combineReducers, createStore, applyMiddleware } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { users } from "./users/reducer";
//import { todos } from "./todos/reducer";
import todosReducer from "./todos/todosSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

// Transform dates back into JS Dates on rehydrate
// (see: https://github.com/rt2zz/redux-persist/issues/82)
const replacer = (key, value) =>
  value instanceof Date ? value.toISOString() : value;
const reviver = (key, value) =>
  typeof value === "string" &&
  value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    ? new Date(value)
    : value;
export const encode = toDehydrate => JSON.stringify(toDehydrate, replacer);
export const decode = toRehydrate => JSON.parse(toRehydrate, reviver);

const persistConfig = {
  key: "root",
  storage,
  transforms: [createTransform(encode, decode)]
};

const rootReducer = combineReducers({
  users,
  todos: todosReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk, logger];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger]
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof rootReducer>;

export default { store, persistor };
