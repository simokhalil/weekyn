import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import users from "./users";
import clients from './clients';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  clients,
  users,
});
