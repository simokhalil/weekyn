import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import users from "./users";
import clients from './clients';
import invoices from './invoices';
import projects from './projects';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  clients,
  invoices,
  projects,
  users,
});
