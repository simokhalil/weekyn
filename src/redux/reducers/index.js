import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import users from "./users";
import clients from './clients';
import projects from './projects';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  clients,
  projects,
  users,
});
