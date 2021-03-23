import { combineReducers, createStore, applyMiddleware } from "redux";
import { users } from "./users/reducer";
import { todos } from "./todos/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  users,
  todos
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppState = ReturnType<typeof rootReducer>;
